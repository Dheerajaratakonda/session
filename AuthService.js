import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || "http://10.168.146.96:8060/securityservice/login/authenticate"
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token
        return this.fetch(`${this.domain}`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
          
        }).then(res => {
            this.setToken(res.token)
            return Promise.resolve(res);
        })
        console.log(this.login("dsar0516", "Sysco2017"))
    }
    
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        console.log(1)
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }
        console.log(options)
        return fetch(url, {
            headers,...options
        })
        .then(response =>
              response.json())
    }
    
    
}
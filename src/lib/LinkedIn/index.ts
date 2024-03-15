class LinkedIn {
    baseAuthorization: string = 'https://www.linkedin.com/oauth/v2/authorization';
    state: string = 'wearetaeb';
    clientId: string = '86spngwvycqa3c';
    scope;
    redirect_uri: string = 'http://localhost:3000/api/authorization';
    constructor(scope: Array<string>) {
        this.scope = scope;
    }

    generateOAuthLink() {
        const scopeFormatted = this.scope.join().replaceAll(',', '%20');
        return `${this.baseAuthorization}?response_type=code&client_id=${this.clientId}&redirect_uri=${this.redirect_uri}&state=${this.state}&scope=${scopeFormatted}`;
    }

    static sayHello() {
        return console.log('Hello');
    }
}

export default LinkedIn;
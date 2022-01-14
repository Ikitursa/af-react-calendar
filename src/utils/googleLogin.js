export default function prepareUserFromGoogleLogin() {
    const gapiUser = window.gapi.auth2.getAuthInstance().currentUser.get()
    const tokens = gapiUser.getAuthResponse()
    const name = gapiUser.getBasicProfile().getName()
    return {name, tokens}
}
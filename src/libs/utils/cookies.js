export const getCookie = (nombreCookie) => {
    var cookies;

    try {
        
        cookies = document.cookie;
    } catch {
        return false;
    }

    var cookiesArray = cookies.split(";");

    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();

        if (cookie.indexOf(nombreCookie + "=") === 0) {
            var valorCookie = cookie.substring(nombreCookie.length + 1);
            valorCookie = decodeURIComponent(valorCookie);

            return valorCookie;
        }
    }

    return null;
}

export const setCookie = (cookieData) => {
    if (!cookieData.name || !cookieData.value) {
        console.error('Debe proporcionar el nombre y el valor de la cookie.');
        return;
    }

    var cookieString = encodeURIComponent(cookieData.name) + '=' + encodeURIComponent(cookieData.value);

    if (cookieData.expires) {
        var expira = new Date(cookieData.expdate).toUTCString();
        cookieString += '; expires=' + expira;
    }

    if (cookieData.path) {
        cookieString += '; path=' + cookieData.path;
    }

    if (cookieData.samesite) {
        cookieString += '; SameSite=' + cookieData.samesite;
    }

    document.cookie = cookieString;
}
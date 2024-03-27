import { setCookie, parseCookies, destroyCookie } from 'nookies'

const queryTypes = ['getUser', 'getTemplate', 'loginUser', 'registerUser', 'uploadTemplate', 'verifyUserSession', 'getUserOrganizations']

let _UserInSession = {}

const apiUrl = 'http://localhost:80/api/Api.php'

export async function fetchApi (jsonQuery, type = 'json') {
  if (!queryTypes.includes(jsonQuery.query)) {
    return { error: 'La query no se encuentra entre los tipos de query validos ERROR-1' }
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonQuery)
  })

  return type === 'json' ? response.json() : response.text()
}

export function responseHasError (response) {
  return !!response.error
}

export function startUserSession (sessionId, securityToken, userId) {
  const cookieOptions = {
    maxAge: 365 * 24 * 60 * 60, // 1 año en segundos
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  };

  ['sessionId', 'securityToken', 'userId'].forEach((cookieName) => {
    setCookie(null, cookieName, eval(cookieName), cookieOptions)
  })

  fetchUserById(userId)
}

export async function validateUserSession () {
  const cookies = parseCookies()

  if (cookies.sessionId && cookies.securityToken && cookies.userId) {
    _UserInSession = await fetchUserById(cookies.userId)
  } else {
    return false
  }

  const response = await fetchApi({
    query: 'verifyUserSession',
    session: {
      sessionId: cookies.sessionId,
      tooken: cookies.securityToken,
      userId: cookies.userId
    }
  })

  return response.result
}

export function deleteUserSession () {
  ['sessionId', 'securityToken', 'userId'].forEach((cookieName) => {
    destroyCookie(null, cookieName, { path: '/' })
  })

  return 'cookies eliminadas'
}

async function fetchUserById (userId) {
  const result = await fetchApi({
    query: 'getUser',
    userType: 'usuario',
    select: ['id', 'nombres', 'apellido_p', 'apellido_m', 'telefono', 'ciudad', 'codigo_postal', 'pais'],
    where: {
      id: userId
    }
  })

  _UserInSession = result.data[0]

  return _UserInSession
}

export function getUserData () {
  return _UserInSession
}

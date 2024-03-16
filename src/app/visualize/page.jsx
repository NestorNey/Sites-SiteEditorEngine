'use client'

import { setCookie } from '@/utils/cookies'

export default function Page() {
    

    const auth_data = {
        username: 'NewUser',
        password: '123456'
    };

    fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(auth_data)

    }).then(response => response.json()).then(data => {
        setCookie({
            name: 'user_token',
            value: data.token,
            samesite: 'Strict'
        })
        // document.cookie = `user_token=${data.token}; SameSite=Strict; Secure`;
        // let token = data.token;
        // console.log(token);

        // fetch('http://localhost:8000/api/test_token/', {
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'Authorization': `Token ${token}`,
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => response.json()).then(data => {
        //     console.log(data);
        // })
    })

    return (
        <div>
            {/* {Object.keys(data.components).map((key) => {
                const style_components = metadata.components[data.style][data.components[key].comp_type]
                for(const i in style_components) {
                    if (style_components[i].style_number === data.components[key].style_number) {
                        const component = style_components[i];
                        return <component.StaticComponent key={key} values={data.components[key].values}/>
                    }
                }
                return "asd"
            })} */}
            "hola"
        </div>
    )
}
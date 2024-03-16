import { getCookie } from "@/utils/cookies";
import { serializeImage } from '@/utils/serializer';

const API_URL = 'http://localhost:8000/api';
const user_token = getCookie('user_token');

export const saveSiteImages = async (siteImages, siteId) => {
    const response = await fetch(`${API_URL}/getSite/${siteId}/`);
    const data = response.ok ? await response.json() : undefined;

    if (data === undefined) throw new Error('Hubo un error al obtener el site.');

    const site = JSON.parse(data.template);

    for(const img of siteImages){
        const image_serialized = await serializeImage(img.file);
       
        img.file = image_serialized;
        img.siteId = siteId;

        const response = await fetch(`${API_URL}/saveSiteImage/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization': `Token ${user_token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(img)
        });

        const data = await response.json();
        
        img.url = data.url ? data.url : '';

        site.items[img.compIndex].values.images[img.inputName] = img.url;
    }

    console.log(site);
    // throw new Error('Hubo un error al obtener el site.');
}

export const saveSite = async (site) => {
    const response = await fetch(`${API_URL}/saveSite/`, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: `Token ${user_token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify(site),
    });

    const data = response.ok ? await response.json() : undefined;

    if (data.siteId != undefined) return data.siteId;
    throw new Error('La respuesta no contiene la id del site.');
}
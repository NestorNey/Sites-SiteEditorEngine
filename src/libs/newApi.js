import { getCookie } from "@/libs/utils/cookies";
import { serializeImage } from '@/libs/utils/serializer';

const API_URL = 'http://127.0.0.1:8000/api';
const user_token = getCookie('user_token') || undefined;

export const saveSiteImages = async (siteImages, siteId) => {
    const site = getSite(siteId);

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

    console.log(await updateSite(site, siteId))
}

export const updateSite = async (site, siteId) => {
    const response = await fetch(`${API_URL}/updateSite/`, {
        method: "POST",
        mode: "cors",
        headers: {
            Authorization: `Token ${user_token}`,
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            siteId,
            siteTemplate: site
        }),
    });

    return response.json();
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

export const getSite = async (siteId) => {

    const response = await fetch(`${API_URL}/getSite/` + siteId, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    const data = await response.json();
    const site = JSON.parse(data.template);

    return site;
}
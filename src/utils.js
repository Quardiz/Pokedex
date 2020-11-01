export default function fetch_retry(url, n) {
    return fetch(url)
                .catch(function(error) {
                    if (n === 1) {
                        throw error;
                    }
                    return fetch_retry(url, n - 1);
                });
}

export const cacheImages = async (pokeData) => {
    // Create list of promises to load imgs
    // wait until all promises are complete
    const promises = await pokeData.map((url) => {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = url
            img.onload = resolve()
            img.onerror = reject()
        })
    })
    
    await Promise.all(promises)
}
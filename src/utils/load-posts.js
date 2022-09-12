export const loadData = async () => {
    const postResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");

    const [posts, photos] = await Promise.all([postResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsWithPhoto = postsJson.map((post, index) => {
        return {
            ...post, cover: photosJson[index].url
        }
    })
    
    return postsWithPhoto;
}
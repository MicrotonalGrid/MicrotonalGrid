export default function updateUrl(key,value)
{
    const url = new URL(location);
    url.searchParams.set(key, value);
    history.pushState({}, "", url);
}


export class Urls {
    // Local url
    public static URL = 'http://192.168.100.4:5000';
    // URLS
    public static HOME_URL = `${Urls.URL}/home`;
    public static CHANGE_LIGHT_STATE_URL = `${Urls.HOME_URL}/change_light_state`;
    public static GET_DOOR_STATE_URL = `${Urls.HOME_URL}/get_door_state`;
    public static TAKE_PHOTO_URL = `${Urls.HOME_URL}/take_photo`;
    public static LOGIN_URL = `${Urls.URL}/login`;
    public static REGISTER_URL = `${Urls.URL}/register`;
}

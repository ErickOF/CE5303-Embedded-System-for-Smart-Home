import os
import datetime


def take_photo() -> str:
    """
    This function is used to take a photo.

    Returns
    ------------------------------------------------------------------
        The path where the image was stored.
    """
    image_name = f'/home/root/server/src/{datetime.datetime.now()}.jpg'.replace(' ', '_')
    os.system(f'fswebcam --no-banner {image_name}')

    return image_name


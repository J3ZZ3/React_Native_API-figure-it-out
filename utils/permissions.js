import * as Permissions from 'expo-permissions';

export const requestPermissions = async () => {
  const { status: cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
  const { status: locationStatus } = await Permissions.askAsync(Permissions.LOCATION);

  if (cameraStatus !== 'granted' || locationStatus !== 'granted') {
    alert('Camera and location permissions are required!');
    return false;
  }
  return true;
}; 
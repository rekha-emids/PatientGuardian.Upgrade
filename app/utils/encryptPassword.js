import {JSEncrypt} from 'jsencrypt';

export function encryptPassword(password) {
    const publicKey =
      '-----BEGIN PUBLIC KEY-----' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs6VZoO8w4s09nZrcBI9o' +
      'znr683qOdjfhA2zryRVtx1Q2SmX0y3LGZws8Oq4+3jBPXmzvckkjoQ5UvEtko70y' +
      'JH4NBolCMlpn5LH3olglGcu+UhORZbrk7dLyy5yy2FxVcziHJoMr5BkZw7MGPdkE' +
      'KYcSWkMoCY3s7K8Y2sr1Yp3mvVTHE0PC7gOTiaVMiMVx5+vlC76MdrwjLLeOJdPX' +
      'ExYkLCg/L2bwpuPDqFVHUFgqkKF7gtCeb/YvWGpVh3gd+fFHzyfn7w+7MbxqcQwQ' +
      '+BMQ6CCTZlwW3HFWJPpbxmo0iV+cmUr6N+/HYKJ5ibKpgrhUSZtY4dPj/CbDZryw' +
      'gwIDAQAB' +
      '-----END PUBLIC KEY-----',

     encryptData = new JSEncrypt();

    encryptData.setPublicKey(publicKey);
    let encryptedData;

    for (let i = 0; i < 10; i++) {
      encryptedData = encryptData.encrypt(password);
      if (!encryptedData.endsWith('==')) {
        break;
      }
    }
    return encryptedData;
}
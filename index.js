const { google } = require("googleapis"); // https://www.npmjs.com/package/googleapis
const path = require("path");
const fs = require("fs");
const mime = "text/plain";
const hound = require("hound"); // модуль для "слежки" за папкой https://www.npmjs.com/package/hound

const localFolder = "C:\\Users\\user\\Desktop\\Новая папка\\Новая папка"; // определенная папка для отслеживания
const googleFolderId = "134vBXfTB5FnQy6PUSj5Ir2Pqz8AxBWS5"; // id папки в гугл драйв для записи файла, к которой есть доступ для данного сервисного аккаунта
// функция записи в гугл
// тело credentials.json пустое для публикации в github, заменить на обьект ниже(данные нашего service account в гугле):
// {
//     "type": "service_account",
//     "project_id": "resender-gdrive-access-40037",
//     "private_key_id": "33edc93973b3fc8c3e548dacc462f43568878015",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMB3BP95Knv9aH\nA3C9SWOHlPsOutUtwncdu/3QgPcNmFYYhXCj32VjQrYqsi1JzhB5KR+K63MzkrD+\na1oiE7cJ7QKbJNGz5kxnH+DWD322YvBSTSJYV37bJUHJ8pf6b9JSf9CJf6/yT2BB\nbYE5nzsnv6zGszOvz0ZQhePPx+IZgCmJYRzeAaabLnYMd9h7j7ifMJxd6W9p8R14\nKqfThkK/fBdIbrmNzZTS700Du45IHAL+UgFq2gnm4LpzLdw9wZh7Sgv+UCOTI9bw\npnC9Ui2UTft9Fs/j0jkb/3mrUGeoSWfFytTcuUBNN1nkQDnGmU9jl5EWKikvSrRj\n5d7dSnxZAgMBAAECggEAAsApbEHnUwtigtAMhQLFp0eTsb1vVRD5eTfw+llYwKZL\nJ9oPBxM35dRkX2jm9Hx6lfWUgyi839G/FjOqjl8ja+GgqWiKoAvPancAWXEcmzjp\nf5niXVxISFT6i8n8BksbuT4Xo24/zXWdk7g8bSNSS/fZBkCW0RdAveJrjDWIHPBK\naTinGLMrZot7xSjnKOQJ6HL0Iesx4n7XgvnSpbShFK433Zwa7cHXfKtOOz7TtiA/\nlTMw3EPPri9Ccup4nLnNxuqYDvVp3wH0bxpoRgobM/CXe9YBMVCc0nll6S6OxJva\nunotk2z4D+AGjUNaV+cV+WpP/nGXjKTtQuwY5rGjgQKBgQD7C42XDgTm8ANSglXg\nS0BPUXivpZbTqr8dbk1jsgRnsWnNmtF/ybV/QlurGnjfB/hyjsG8Op/NP56ikRnZ\nd7yX6Wjm/IGjPHnBW94LznWY2lgKRgTR2cbr0MPNBDol5YeJdPo8E6TjOkPGryoF\nzfK2abrgYSIUBRvcqyK3ebKpgQKBgQDQDlRFCYhpdM2IcwkwOq72z3RqQ5UHTpzg\nhXzXteJajHg9Y8lT7lei3yUi6qHE3LJAG4HQXMMPTDY2HERp9ic9R5XwfOtYBtej\nn3oRCzHXDVhw1/1aGNRFe1z62RnSHPoNpA78HPWOzE0dXgpgkOIH0ICv3DsLEGDs\nUCVLi/PO2QKBgQCcaBtD9GELfJelTTyxrFCZ2lmFnXY109iUPoeKyHtEG12e0okZ\nw5MHgVFZbfnGgtHAlb6QRjoPh0aPZDWlrpraTnqkBsfB6si0tkbGNlA/9jEJ3Yvd\nLoBnpT6IOcz8lV93PWE2EssVItTdMX7N9Pz1tzPN3dZ8gJ5WQm0zwGeWgQKBgAxT\nvQR2IyH0bLUX88RqxbET65bcODk9nCflYNc7DJVG21zvy57wcTrSM9YUxs7uMJWB\ny7g3tsryPggItrj8f6iu1CByllMZ3K7yJP5bhnFydfoBoh4zeGhBfenS8Se01c/3\nF3gykw4J5svFpaHBE9NYtDc3OjxWlReLTBpkyWZJAoGAUYI9AAh0IoeKFN9tN32q\nr+OvNl2EmLynbGspntvoInmQjYsoRaFMY2JwzEc/B/7c3iGPKDGKPJTg6neJ3WmL\nstgOwBr+Ze/2nkRXm2YGnweXQ6v45GVxM40I7hXfa2sc9AkmQRWH4AGtaJrDNsLI\nhucdKsOMLrv+FMBOt7Kd+rQ=\n-----END PRIVATE KEY-----\n",
//     "client_email": "gdrive-resender-service@resender-gdrive-access-40037.iam.gserviceaccount.com",
//     "client_id": "115829161141710075801",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/gdrive-resender-service%40resender-gdrive-access-40037.iam.gserviceaccount.com"
//   }

// папка в гугл драйв расширена с аккаунтом gdrive-resender-service@resender-gdrive-access-40037.iam.gserviceaccount.com


async function saveToDrive(filePath) {
  const auth = new google.auth.GoogleAuth({
    // авторизация в Гугле Драйв
    keyFile: path.join(__dirname, "credentials.json"),
    scopes: "https://www.googleapis.com/auth/drive",
  });
  const client = await auth.getClient();
  // экземпляр обьекта gdrive
  const drive = google.drive({
    version: "v3",
    auth: auth,
    client,
  });
  let fileName = path.basename(filePath);
  let fileMetadata = {
    name: fileName,
    parents: [googleFolderId],
  };
  let media = {
    mimeType: "text/plain", // подходит для файлов с расширением .MIR
    body: fs.createReadStream(filePath), // тело
  };
  // Записываем файл в гугл драйв
  drive.files.create(
    {
      resource: fileMetadata, // метаданные файла - имя и родительская папка
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        console.error(err);
      }
    }
  );
}

const watcher = hound.watch(localFolder);

watcher.on("create", (file) => {
  // при событии создания файла
  let ownership = checkOwner(file); // проверка принадлежности файла по sign-on
  if (ownership) {
    // если файл наш
    saveToDrive(file); // пишем этот файл ы гугл драйв, используя описанную выше функцию
  } else {
    console.log("not our file");
  }
});

function checkOwner(file) {
  let rawText = fs.readFileSync(file, "utf8"); // читаем содержимое
  let signOns = ["89", "GB", "MB"]; // массив наших используемых сайн-онов
  let bookedBy = rawText.substring(118, 120);
  let ticketedBy = rawText.substring(121, 123);
  let found = signOns.filter((son) => bookedBy === son || ticketedBy === son); // фильтр списка сайн-онов по найденным санонам в файле
  if (found.length !== 0) {
    // если не ноль, то файл наш и возвращаем значение ИСТИНА
    return true;
  }
  return false;
}

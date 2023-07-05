function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 
 
 const div = document.createElement("div");
 const img = document.createElement("img");
 img.setAttribute("src", "cat.jpg");
 img.setAttribute("id", "gato")
div.appendChild(img);

document.body.appendChild(div);


var imagePath = 'cat.jpg';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', imagePath, true);
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this.status == 200) {
                var blob = this.response;
                var reader = new FileReader();

                reader.onloadend = function() {
                    var base64String = reader.result.split(',')[1]; // Extract base64 data

                    console.log('b64', base64String); // Log the Base64 string to the console


                    var imgBlob = base64ToBlob(base64String, 'image/jpeg'); // Convert to Blob
                    var blobUrl = URL.createObjectURL(imgBlob); // Create URL for the Blob

                    document.getElementById('previewImage').setAttribute("src", blobUrl); // Set image source
                    
                    // You can store the blobUrl for later use if needed
                };

                reader.readAsDataURL(blob);
                console.log("here is our blob", blob)
            }
        };

        xhr.send();

        function base64ToBlob(base64String, contentType) {
            var sliceSize = 1024;
            var byteCharacters = atob(base64String);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }

            return new Blob(byteArrays, { type: contentType });
        }

 
export class Webcam {
    private webcamElement: any;
    private canvasElement: any;
    constructor(webcamElement: any, canvasElement: any) {
        this.webcamElement = webcamElement;
        this.canvasElement = canvasElement;
    }

    public adjustVideoSize(width: number, height: number) {
        const aspectRatio = width/ height;
        if(width >= height) {
           this.webcamElement.width = aspectRatio * this.webcamElement.height;
        } else {
            this.webcamElement.height = this.webcamElement.width / aspectRatio;
        }
    }

    public async setup() {
        return new Promise((resolve, reject) => {
            if(navigator.mediaDevices.getUserMedia !== undefined) {
                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'user'
                    }
                })
                .then((mediaStream) => {
                    if("srcObject" in this.webcamElement) {
                        this.webcamElement.srcObject = mediaStream;
                    } else {
                        // for older browsers without the src object
                        this.webcamElement.src = window.URL.createObjectURL(mediaStream);
                    }
                    this.webcamElement.addEventListner(
                        'loadeddata',
                        async () => {
                            this.adjustVideoSize(
                                this.webcamElement.videoWidth,
                                this.webcamElement.videoHeight
                            );
                        },
                        false
                    );
                });

            } else {
                reject();
            }
        })
    }

    public _drawImage() {
        const imageWidth = this.webcamElement.videoWidth;
        const imageHeight = this.webcamElement.videoHeight;

        const context = this.canvasElement.getContext('2d');
        this.canvasElement.width = imageWidth;
        this.canvasElement.height = imageHeight;

        context.drawImage(this.webcamElement, 0, 0, imageWidth, imageHeight);
        return { imageHeight, imageWidth };
      }

     public takeBlobPhoto() {
        const { imageWidth, imageHeight } = this._drawImage();
        return new Promise((resolve, reject) => {
            this.canvasElement.toBlob((blob: any) => {
                resolve({ blob, imageHeight, imageWidth });
            });
        });
      }

      public takeBase64Photo({ type, quality } = { type: 'png', quality: 1 }) {
        const { imageHeight, imageWidth } = this._drawImage();
        const base64 = this.canvasElement.toDataURL('image/' + type, quality);
        return { base64, imageHeight, imageWidth };
      }
}
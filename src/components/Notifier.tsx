import * as React from "react";
import "../App.css";

export const Notifier = (props: any) => {
    const message = props.offline ?
        `CloudyCam is offline! Your images will be saved now and then uploaded to your Cloudinary Media Library once your Internet connection is back up.`
        :
        `Take a picture and it will be uploaded to your Cloudinary Media Library.`;
    return (
        <div className="notify">
            <p>
                <em>{message}</em>
            </p>
        </div>
    );
}
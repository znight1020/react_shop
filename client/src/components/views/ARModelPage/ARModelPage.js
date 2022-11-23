import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
function ARModelPage() {
    const { unityProvider } = useUnityContext({
        loaderUrl: "/Build/github.loader.js",
        dataUrl: "/Build/github.data",
        frameworkUrl: "/Build/github.framework.js",
        codeUrl: "/Build/github.wasm",
    });

    return (
        <Unity
            style={{
                width: "90%",
                height: "100%",
                justifySelf: "center",
                alignSelf: "center",
            }}
            unityProvider={unityProvider}
        />
    );
}

export default ARModelPage;

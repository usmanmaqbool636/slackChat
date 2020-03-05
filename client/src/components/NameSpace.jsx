import React from 'react';
const NameSpace=()=>{
    return (
        <div className="col-sm-1 namespaces">
          <div className="namespace" ns="/wiki">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png" />
          </div>
          <div className="namespace" ns="/mozilla">
            <img src="https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png" />
          </div>
          <div className="namespace" ns="/linux">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" />
          </div>
        </div>
    )
}
export default NameSpace;
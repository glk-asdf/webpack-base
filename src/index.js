import _ from 'lodash';
import '@/assets/scss/index.scss';
// import qwe from '@/assets/image/qwe.jpg'

import '@/assets/iconfont/iconfont.css'

function component () {
    const element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    element.classList.add('hello');
    element.classList.add('some-icon-huaban');

    // 添加图片
    // const myIcon = new Image();
    // myIcon.src = qwe;
    // element.appendChild(myIcon);

    return element
}

document.body.appendChild(component());

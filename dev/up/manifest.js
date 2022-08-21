/*
Understandable Passwords - make random, yet understandable sentences to use as passwords
Copyright 2022 Đặng Văn Quân

This file is part of Understandable Passwords.

Understandable Passwords is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Understandable Passwords is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Understandable Passwords. If not, see <https://www.gnu.org/licenses/>.

Contact email: gizapp@tutanota.com
*/
'use strict';
const manifestElem = document.querySelector("link[rel~='manifest']");
document.addEventListener('themechange', e => {
  dynamicManifest.background_color = rootStyle.getPropertyValue('--color1')
  dynamicManifest.theme_color = rootStyle.getPropertyValue('--color1')
  dynamicManifest.icons = [{
    src:processIcon(iconTemplate, e.color, e.darkMode),
    sizes:'512x512',
    type:'image/svg+xml',
    purpose:'any',
  }]
  const blob = new Blob([JSON.stringify(dynamicManifest)], {type: 'application/json'});
  const manifestURL = URL.createObjectURL(blob);
  manifestElem.href = manifestURL
})

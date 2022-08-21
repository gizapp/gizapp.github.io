/*
Understandable Passwords - make random, yet understandable sentences to use as passwords
Copyright 2022 Đặng Văn Quân

This file is part of Understandable Passwords.

Understandable Passwords is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Understandable Passwords is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with Understandable Passwords. If not, see <https://www.gnu.org/licenses/>.

Contact email: gizapp@tutanota.com
*/
let iconPrefix = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 960 960" '
let iconTemplate = iconPrefix + 'style="stroke:#fff;fill:none;stroke-width:12"><path fill="{color1}" stroke="none" d="m875.99648 875.99643c-112.00475 112.00475-679.98823 112.00475-791.992917 0-112.00475-112.00469-112.00475-679.98822 0-791.992913 112.004687-112.004689 679.988167-112.004689 791.992917 0 112.00468 112.004693 112.00468 679.988223 0 791.992913z"/><path fill="#000" stroke="none" d="m570 583.12h59.4c111 0 156.6-53.4 156.6-142.8v-41.4c0-90.6-45.6-142.2-156.6-142.2h-89.7l19.98 89.04c18.24 12.96 30.24 26.88 46.08 42.24l2.88-1.92c-3.36-15.36-6.24-29.28-10.56-47.04-3.84-15.84-6.72-24.48-13.44-37.44 9.12-3.36 22.08-5.76 37.92-5.76 31.2 0 39.84 14.4 33.6 51.36-2.88 15.84-6.72 26.4-12 38.88l2.4 1.92c16.32-15.84 29.28-26.88 67.2-55.2 7.2 8.16 11.04 12.96 14.4 18.72 12.96 22.08 10.56 40.32-7.2 47.04-24.48 9.6-39.84 13.92-59.52 19.68v2.88c26.88 9.12 44.64 15.84 82.56 31.68-2.88 10.08-5.76 16.32-9.12 22.08-12.48 22.08-29.76 28.8-44.16 17.28-20.64-16.32-29.28-24.96-45.6-40.8l-2.88 1.44c4.32 16.8 6.24 28.32 8.64 43.2 3.36 20.64 6.72 30.24 12.96 43.2-13.44 3.36-23.52 4.8-36 4.8-34.08 0-42.24-15.84-34.08-51.36 3.36-14.4 6.72-26.4 11.52-39.36l-2.4-1.92c-22.56 19.68-38.88 33.12-65.76 53.76z"/><path opacity="0.2" d="m916.6842 224.558c-5.9-24.386-12.57-46.567-20.97-65.82-18.36-33.981-32.42-53.926-68.56-71.5915-44.78-30.7356-121.5-49.319-210.52-57.3853-39.82-3.6236-81.32-5.3187-122.59-5.2027-26.25-0.1019-50.69 7.4769-76.5 8.828-43.41 1.0262-85.17 4.0148-124.06 9.0047-79.14 11.8136-143.66 33.1193-173.98 63.7288-9.86 9.905-18.81 23.578-26.82 40.307-13.87 28.879-24.88 66.747-33.18 109.887-5.58 44.71-9.45 94.524-9.79 146.436-4.1 45.83-5.51 92.711-5.13 138.764 2.45 83.726 13.63 164.156 33.39 224.075 11.44 35.101 25.57 62.811 42.38 79.654 11.12 11.151 26.99 21.121 46.59 29.914 38.04 14.228 87.94 25.072 144.82 31.518 98.17 20.023 218.95 23.32 326.35 11.608 52.42-5.799 100.48-14.927 140.02-27.422 35.65-11.332 62.1-32.516 78.95-49.369 24.1-21.418 42.46-63.662 56.82-116.642 11.17-41.899 19.48-92.352 24.29-146.738 1.98-24.071 3.29-48.722 3.98-73.83-2.57-29.015-4.31-57.475-7.61-85.846 0.65-24.013 0.37-47.5 0.23-70.761-2.62-43.561-8.66-85.659-18.1-123.116"/><path opacity="0.35" d="m889.3042 242.996c-5.53-21.681-11.79-41.338-20.02-58.98-21.19-24.933-35.09-40.378-68.53-53.317-35.12-35.9361-101.4-55.4016-183.26-62.2964-36.34-3.0974-73.69-4.1978-110.3-3.6107-22.43-0.0872-40.04 18.7991-62.11 19.954-39.61-1.2141-77.05-0.6811-112.95 1.702-69.61 8.6827-126.79 27.4891-154.44 55.9221-8.66 8.768-16.53 20.785-23.61 35.445-12.48 25.731-22.23 59.284-29.68 97.204 0.11 40.24-0.34 83.935 3.48 129.981-6.64 40.359-10.15 80.989-12.89 121.679-0.41 72.612 8.87 144.08 27.43 198.295 10.14 30.665 22.67 54.939 37.5 69.865 9.82 9.894 23.71 18.751 40.78 26.579 36.42 9.164 81.44 16.482 133.51 19.274 81.03 27.013 184.2 33.247 282.41 23.236 46.62-4.957 89.16-12.968 124.91-24.137 30.47-9.686 50.15-40.446 64.56-54.851 23.17-16.113 40.13-50.967 55.4-93.882 11.64-34.142 21.25-78.244 27.17-127.938 2.18-21.412 3.72-43.389 4.73-66.314-7.71-27.102-11.77-52.405-18.5-78.19 3.42-21.571 5.41-42.274 8.85-63.551 0.34-38.211-4.48-76.844-14.43-112.068"/><path opacity="0.45" d="m855.6242 265.681c-5.08-18.353-10.83-34.905-18.85-50.565-24.69-13.801-38.39-23.71-68.5-30.834-23.22-42.334-76.66-62.884-149.72-68.338-32.05-2.45-64.31-2.819-95.17-1.652-17.74-0.069-26.96 32.729-44.41 33.643-34.95-3.971-67.07-6.459-99.27-7.283-57.9 4.831-106.04 20.562-130.42 46.317-7.18 7.369-13.74 17.351-19.65 29.463-10.77 21.858-18.99 50.103-25.38 81.602 7.11 34.737 10.86 70.904 19.81 109.733-9.77 33.629-15.86 66.569-22.44 100.66-3.94 58.939 3 119.381 20.09 166.578 8.56 25.206 19.11 45.252 31.5 57.82 8.23 8.348 19.68 15.837 33.63 22.477 34.42 2.934 73.45 5.913 119.6 4.208 59.94 35.613 141.44 45.461 228.34 37.543 39.49-3.921 75.24-10.558 106.33-20.094 24.1-7.662 35.45-50.203 46.85-61.597 22.04-9.584 37.26-35.346 53.65-65.88 12.22-24.597 23.43-60.885 30.72-104.807 2.43-18.14 4.25-36.828 5.65-57.068-14.02-24.748-20.95-46.166-31.89-68.768 6.82-18.567 11.6-35.846 19.44-54.682 3.98-31.629 0.67-65.999-9.91-98.475"/><path opacity="0.5" d="m817.0542 291.655c-4.56-14.543-9.73-27.539-17.5-40.929-28.7-1.057-42.18-4.627-68.47-5.093-9.61-49.659-48.34-71.452-111.32-75.255-27.15-1.709-53.57-1.24-77.85 0.59-12.37-0.048-11.97 48.679-24.15 49.316-29.6-7.126-55.63-13.073-83.61-17.57-44.48 0.42-82.27 12.63-102.9 35.32-5.49 5.767-10.53 13.417-15.12 22.614-8.82 17.422-15.27 39.59-20.46 63.737 15.13 28.438 23.7 55.985 38.51 86.551-13.35 25.922-22.39 50.057-33.37 76.592-7.98 43.284-3.72 91.101 11.69 130.263 6.74 18.957 15.03 34.163 24.63 44.03 6.4 6.578 15.06 12.499 25.44 17.78 32.14-4.199 64.29-6.188 103.67-13.042 35.79 45.46 92.49 59.447 166.44 53.924 31.31-2.734 59.3-7.799 85.04-15.466 16.81-5.344 18.63-61.373 26.58-69.32 20.75-2.109 33.97-17.462 51.65-33.818 12.88-13.669 25.93-41.01 34.79-78.323 2.71-14.394 4.85-29.315 6.7-46.481-21.26-22.052-31.46-39.024-47.22-57.982 10.71-15.127 18.69-28.485 31.56-44.526 8.15-24.092 6.57-53.582-4.73-82.912"/><path opacity="0.5" d="m774.3942 320.384c-3.99-10.328-8.52-19.39-16.02-30.271-33.12 13.042-46.35 16.483-68.43 23.382 5.46-57.762-17-80.929-68.84-82.908-21.72-0.888-41.68 0.507-58.69 3.072-6.43-0.025 4.6 66.32-1.73 66.652-23.69-10.617-42.98-20.391-66.29-28.949-29.64-4.458-55.98 3.857-72.47 23.155-3.62 3.995-6.99 9.068-10.1 15.039-6.67 12.516-11.18 27.962-15.03 43.976 24 21.471 37.9 39.484 59.19 60.909-17.31 17.398-29.61 31.794-45.45 49.971-12.45 25.967-11.15 59.821 2.39 90.094 4.74 12.045 10.52 21.896 17.04 28.776 4.37 4.62 9.94 8.807 16.37 12.585 29.62-12.089 54.17-19.573 86.05-32.122 9.08 56.352 38.35 74.916 97.97 72.044 22.28-1.423 41.67-4.748 61.51-10.348 8.74-2.779 0.01-73.729 4.15-77.862 19.31 6.159 30.34 2.32 49.44 1.646 13.6-1.581 28.68-19.026 39.28-49.029 3.02-10.25 5.52-21.005 7.86-34.771-29.25-19.071-43.08-31.122-64.18-46.05 15.02-11.323 26.54-20.344 44.98-33.294 12.76-15.755 13.09-39.846 1-65.697"/><path fill="#fff" stroke="none" d="m588 416.8c-28.32-10.08-48-17.76-81.6-31.68 2.4-7.2 4.8-15.36 9.12-22.56 12.96-21.12 28.8-27.84 44.16-16.8 3.7368 2.655 7.212 5.3508 10.512 8.0916V323.248c0-51.072-18.144-73.248-69.216-73.248-12.096 0-25.536 2.016-35.616 6.72V540.976C427.056 594.064 378 619.6 334.992 619.6c-8.736 0-15.456-1.344-21.504-4.704 18.816-110.88 26.88-190.176 26.88-264.096 0-77.952-30.24-100.8-85.344-100.8-16.128 0-28.896 1.344-45.024 6.72 7.392 21.504 10.752 46.368 10.752 73.92v278.88c0 78.624 51.744 124.32 102.144 124.32 50.4 0 107.52-22.176 138.432-112.224h4.032c2.016 97.44 28.896 110.88 71.232 110.88 17.472 0 35.616-2.016 46.368-5.376-8.736-21.504-12.768-43.008-12.768-67.872V479.0476c-9.837 8.0256-20.2542 16.23-33.072 26.073-5.28-5.28-11.04-11.52-15.36-19.2-11.52-20.64-9.6-39.36 7.68-46.56C550.56 430.24 566.4 426.4 588 419.68"/></svg>'
const faviconTemplate = iconPrefix + '><path fill="{colorFg}" d="M600 635.2h99c185 0 261-89 261-238v-69c0-151-76-237-261-237H549.5l33.3 148.4c30.4 21.6 50.4 44.8 76.8 70.4l4.8-3.2C658.8 281.2 654 258 646.8 228.4 640.4 202 635.6 187.6 624.4 166c15.2-5.6 36.8-9.6 63.2-9.6 52 0 66.4 24 56 85.6-4.8 26.4-11.2 44-20 64.8l4 3.2c27.2-26.4 48.8-44.8 112-92 12 13.6 18.4 21.6 24 31.2 21.6 36.8 17.6 67.2-12 78.4-40.8 16-66.4 23.2-99.2 32.8v4.8c44.8 15.2 74.4 26.4 137.6 52.8-4.8 16.8-9.6 27.2-15.2 36.8-20.8 36.8-49.6 48-73.6 28.8-34.4-27.2-48.8-41.6-76-68l-4.8 2.4c7.2 28 10.4 47.2 14.4 72 5.6 34.4 11.2 50.4 21.6 72-22.4 5.6-39.2 8-60 8-56.8 0-70.4-26.4-56.8-85.6 5.6-24 11.2-44 19.2-65.6l-4-3.2c-37.6 32.8-64.8 55.2-109.6 89.6z"/><path fill="{color1}" d="M630 358c-47.2-16.8-80-29.6-136-52.8 4-12 8-25.6 15.2-37.6 21.6-35.2 48-46.4 73.6-28 6.228 4.425 12.02 8.918 17.52 13.486V202.08C600.32 116.96 570.08 80 484.96 80 464.8 80 442.4 83.36 425.6 91.2V564.96C361.76 653.44 280 696 208.32 696 193.76 696 182.56 693.76 172.48 688.16 203.84 503.36 217.28 371.2 217.28 248 217.28 118.08 166.88 80 75.04 80 48.16 80 26.88 82.24 0 91.2c12.32 35.84 17.92 77.28 17.92 123.2v464.8c0 131.04 86.24 207.2 170.24 207.2 84 0 179.2-36.96 230.72-187.04h6.72c3.36 162.4 48.16 184.8 118.72 184.8 29.12 0 59.36-3.36 77.28-8.96-14.56-35.84-21.28-71.68-21.28-113.12V461.746c-16.395 13.376-33.757 27.05-55.12 43.455-8.8-8.8-18.4-19.2-25.6-32-19.2-34.4-16-65.6 12.8-77.6C567.6 380.4 594 374 630 362.8"/></svg>'
const previewImg = '<svg xmlns="http://www.w3.org/2000/svg" width="1320" height="693" stroke-width="12" fill="none"><rect fill="#1a1a4d" width="1320" height="693"/><path fill="#4bf" d="m1010 503v-20c0-1 0-2 0-3-21-11-44-22-67-33v13c0 2 0 2 1 3 14 7 37 18 56 28v3c-18 9-42 20-56 27-1 1-1 1-1 3v13c23-11 50-24 67-34zm-125 24c-13 0-22-2-31-7h-2v12c0 1 0 2 1 2 5 4 17 7 32 7 22 0 36-10 36-26 0-12-9-20-23-23l-16-3c-10-3-13-5-13-10 0-7 6-11 20-11 11 0 17 1 25 4h3v-12c0-1-1-2-2-3-5-1-12-4-24-4-24 0-37 11-37 26 0 12 7 19 23 22l16 3c9 2 13 6 13 11 0 7-6 12-21 12zM785 453c-17 0-28 12-28 32v25c0 20 11 32 28 32 11 0 19-6 25-15h2v11c0 1 1 2 2 2h13V422c0-1-1-2-2-2h-13v48h-2c-6-10-14-15-25-15zm-9 70c-3-3-5-8-5-15v-20c0-14 7-21 18-21 8 0 16 5 23 14v33c-7 10-15 14-23 14-6 0-10-2-13-5zm-70 17v-57c8-10 14-15 24-15 3 0 6 1 8 2h2v-13c0-1 0-2-1-2-1-1-4-2-8-2-9 0-16 5-22 17h-3v-13c0-1-1-2-2-2h-14v83c0 1 1 2 2 2zm-78-87c-21 0-37 15-37 36v18c0 20 15 35 37 35 20 0 36-15 36-36v-18c0-20-14-35-36-35zm0 14c7 0 12 2 15 5 4 4 7 10 7 17v16c0 13-8 23-23 23-6 0-12-2-15-6-4-3-6-9-6-16v-17c0-13 8-22 22-22zM508 455c-6 22-13 49-17 72h-3c-3-23-10-52-14-70 0-2-1-2-2-2h-14c7 27 16 62 20 81 1 3 1 4 3 4h18c6-25 11-39 15-65h3c5 27 10 43 15 62 0 2 1 3 2 3h18c7-27 15-60 21-83 0-2-1-2-2-2h-13c-5 23-11 46-15 72h-2c-4-23-11-47-17-70-1-2-1-2-2-2zm-102 72c-13 0-21-2-30-7h-3v12c0 1 1 2 1 2 6 4 17 7 32 7 23 0 36-10 36-26 0-12-8-20-22-23l-16-3c-11-3-14-5-14-10 0-7 6-11 21-11 10 0 17 1 25 4h2v-12c0-1 0-2-2-3-4-1-12-4-23-4-24 0-37 11-37 26 0 12 6 19 22 22l16 3c10 2 14 6 14 11 0 7-6 12-22 12zm-88 0c-13 0-21-2-30-7h-3v12c0 1 1 2 1 2 6 4 17 7 32 7 23 0 36-10 36-26 0-12-8-20-22-23l-16-3c-11-3-14-5-14-10 0-7 6-11 21-11 10 0 17 1 25 4h2v-12c0-1 0-2-2-3-4-1-12-4-23-4-24 0-37 11-37 26 0 12 6 19 22 22l16 3c10 2 14 6 14 11 0 7-6 12-22 12zm-59-43c0-22-10-31-34-31-13 0-26 4-28 6 0 0 0 1 0 1v12h2c9-4 16-5 26-5 15 0 20 4 20 17v7h-29c-16 0-25 9-25 23v5c0 14 9 23 24 23 13 0 23-6 28-16h2c1 10 8 14 17 14h6c1 0 1 0 1-2v-11h-4c-2 0-3 0-4-1-1-2-2-3-2-6zm-53 33v-5c0-3 0-6 2-7 2-2 6-4 10-4h27v15c-9 9-17 12-27 12-8 0-12-4-12-11zm-86 23v-39h20c25 0 36-12 36-31v-11c0-23-14-31-36-31H94.8v12c0 1 0.6 1 1.8 1h7.4v97c0 1 1 2 2 2zm20-99c8 0 13 2 17 5 2 3 4 7 4 12v12c0 12-7 18-21 18h-20v-47z"/><path fill="#fff" d="m825 162c-25 0-43 19-43 46v1c0 26 19 43 45 43 11 0 20-2 26-7 3-3 5-7 5-14 0-2 0-4-1-6h-1c-8 5-18 8-29 8-9 0-15-1-20-4-2-4-3-9-3-16v0c0-2 0-3 0-4l1-1c3 3 8 5 14 5h36c3 0 6-3 6-15v-1c0-21-14-35-36-35zm2 18c4 0 6 0 9 1 3 4 3 9 3 14 0 1 0 3 0 5h-34c3-14 11-20 22-20zm-63 45h-1c-5 4-12 5-18 5-4 0-6 0-8-1-1-2-1-4-1-7v-36h28c1-3 1-6 1-9 0-10-2-13-10-13h-19v-13c0-10-6-14-14-14-3 0-6 0-10 1 2 5 2 10 2 15v11h-16c-1 1-1 2-1 4 0 10 4 16 17 17v39c0 17 12 28 29 28 9 0 15-2 18-5 2-4 4-9 4-16 0-2 0-4-1-6zm-80-32c0-14-13-31-35-31-16 0-23 2-27 6-3 2-4 7-4 11 0 3 0 6 1 7h1c8-2 15-3 24-3 8 0 14 1 20 4-1 6-2 11-3 16-5-2-13-3-22-3-15 0-29 14-29 25v1c0 17 9 26 25 26 12 0 22-9 26-17h1c3 8 9 16 18 16 3 0 6-1 10-5 3-3 5-9 5-15 0-2 0-2 0-4h-1c-2 2-5 3-7 3-1 0-2-1-3-1zm-51 32v0c0-3 1-6 2-9 2-2 6-2 10-2 5 0 10 0 16 1v9c-6 6-13 9-19 9-7 0-9-2-9-8zm-65 25v-34c7-20 13-29 22-29 4 0 6 1 9 3h1c1-4 2-8 2-12 0-8-2-12-4-15-2-2-4-2-7-2-10 0-17 10-22 29h-1v-1c0-20-7-26-18-26-2 0-4 0-6 1 2 4 3 10 3 15v58c0 8 4 14 15 14 2 0 4-1 6-1zm-77-88c-25 0-43 19-43 46v1c0 26 18 43 45 43 10 0 20-2 25-7 4-3 5-7 5-14 0-2 0-4 0-6h-1c-9 5-19 8-29 8-10 0-15-1-21-4-2-4-3-9-3-16v0c0-2 0-3 1-4v-1c3 3 9 5 15 5h36c3 0 5-3 5-15v-1c0-21-13-35-35-35zm2 18c4 0 6 0 8 1 3 4 4 9 4 14 0 1 0 3 0 5h-34c3-14 11-20 22-20zm-117 70v-34c8-22 17-30 25-30 3 0 5 1 7 4-3 15-5 27-5 39 0 17 7 22 19 22 3 0 5 0 8-1-2-9-3-15-3-25v-37c0-12-8-26-18-26-13 0-26 12-32 28h-1v-1c0-20-8-26-18-26-2 0-4 0-7 1 3 4 3 10 3 15v58c0 8 4 13 16 13 2 0 4 0 6 0zm-77-88c-25 0-43 19-43 46v1c0 26 18 43 45 43 10 0 20-2 25-7 4-3 5-7 5-14 0-2 0-4 0-6h-1c-9 5-19 8-29 8-10 0-15-1-21-4-2-4-3-9-3-16v0c0-2 0-3 1-4v-1c3 3 9 5 15 5h36c3 0 5-3 5-15v-1c0-21-13-35-35-35zm2 18c4 0 6 0 8 1 3 4 4 9 4 14 0 1 0 3 0 5h-34c3-14 11-20 22-20zm-101 14c-1 1-1 3-1 4 0 11 6 15 21 15 0 1 0 2 0 3 0 10-7 16-20 16-14 0-22-5-26-15-1-3-1-7-1-11v-2c0-27 14-49 33-49 2 0 4 0 6 1 0 4-1 8-1 13 0 6 5 8 13 8 3 0 7 0 9-1v-12c0-10-3-16-9-22-5-5-12-7-21-7-30 0-51 30-51 69v3c0 28 16 46 47 46 12 0 23-4 29-9 5-5 8-10 8-18 0-6-1-9-4-12v-1h9v-1c0-13-2-18-10-18z"/><rect stroke="#fff" width="820" height="200" x="96" y="96" ry="48"/><path stroke="#4bf" d="M0 663H1320"/></svg>'
dynamicManifest = {
  name:'Understandable Passwords',
  description:'The tool to generate strong and easily memorizable passwords',
  short_name:'UPass',
  categories:['password', 'productivity', 'security'],
  display:'fullscreen',
  orientation:'any',
  start_url:'https://gizapp.github.io/up/',
}
minifierProps = {
  previewImg:dynamicManifest.start_url + 'preview.png',
  previewImgWidth:'1320',
  previewImgHeight:'693',
  previewImgAlt:'The main interface of Understandable Passwords',
}

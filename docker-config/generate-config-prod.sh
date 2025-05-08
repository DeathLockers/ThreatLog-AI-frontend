#!/bin/sh
cat <<EOF > /usr/share/nginx/html/config.json
{
  "APP_AXIOS_BASEURL": "${APP_AXIOS_BASEURL}",
  "APP_WS_BASEURL": "${APP_WS_BASEURL}"
}
EOF

exec nginx -g "daemon off;"
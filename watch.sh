while true; do
  inotifywait -r -e modify,create,delete ./chrome-extension-starter-react-dist
  cp -r ./chrome-extension-starter-react-dist /media/sf_GUEST/
done
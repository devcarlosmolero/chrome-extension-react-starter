while true; do
  inotifywait -r -e modify,create,delete ./chrome-extension-react-starter-dist
  cp -r ./chrome-extension-react-starter-dist /media/sf_GUEST/
done

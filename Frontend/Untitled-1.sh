
# curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt-get install nodejs -y

git clone -b Deploy https://github.com/Wipupat-Chomthaworn/POWER-PLANNER.git

chmod -R a+rwx POWER-PLANNER


cd POWER-PLANNER
cd Frontend
rm -rf node_modules
screen
npm install  # Install all the dependencies for the
npm run dev


screen #create another screen
cd ..
cd Backend
rm -rf node_modules
npm i
nodemon
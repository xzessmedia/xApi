    # Install latest Api Build, Backup first
    echo "BACKEND INSTALLATION"
    echo "Stopping Datahub Service"
    pm2 delete "Datahub-Api"
    echo "Creating Backups.."
    rm -rf /srv/datahub-api-backup2/
    mv /srv/datahub-api-backup/ /srv/datahub-api-backup2/
    mv /srv/datahub-api/ /srv/datahub-api-backup/
    echo "Installing Datahub Backend"
    mkdir /srv/datahub-api
    cp -R /home/koepsel/DatahubLatest/Api/* /srv/datahub-api
    cd /srv/datahub-api && npm install
    echo "Running Build Process"
    cd /srv/datahub-api/ && npm run build
    echo "Deploying Datahub Service ($ pm2 status)"
    cd /srv/datahub-api/dist && pm2 --name "Datahub-Api" start index.js && pm2 save
    echo "====================================================="
    echo "Installation of Datahub Backend completed.. "
    echo "Backend should be live now.."
    echo "====================================================="

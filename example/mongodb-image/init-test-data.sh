mongoimport -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --authenticationDatabase=admin --db test --collection airports --drop --type csv --headerline --file /airports.csv
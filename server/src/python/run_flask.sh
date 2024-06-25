# server/src/python/run_flask.sh
#!/bin/bash

# Activate the virtual environment
source server/src/python/venv/bin/activate

# add the services and classes folders to the python paths
export PYTHONPATH=server/src/python/services:$PYTHONPATH
export PYTHONPATH=server/src/python/classes:$PYTHONPATH

# ensure port 5000 is clear for use
python server/src/python/clearPort5000.py

# Run the Flask script
python server/src/python/flask_api.py


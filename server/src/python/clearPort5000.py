import psutil

def find_process_on_port(port):
  for process in psutil.process_iter():
    try:
      for conn in process.connections():
        if conn.laddr.port == port:
          return process
    except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ConnectionError):
      pass
  return None

process = find_process_on_port(5000)
if process:
  print(f"Process ID: {process.pid} ({process.name()}) is using port 5000. Terminating process...")
  process.terminate()
else:
  print(f"No process found using port {5000}.")
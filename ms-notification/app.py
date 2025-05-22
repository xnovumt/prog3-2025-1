import threading
import server

def run_server():
    server.app.run(debug=False,port=8081, use_reloader=False)

if __name__ == '__main__':
    server_thread = threading.Thread(target=run_server)
    server_thread.start()
    server_thread.join()
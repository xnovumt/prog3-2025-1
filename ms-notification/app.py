import server

def run_server():
    server.app.run(debug=False,port=8081, use_reloader=False)

if __name__ == '__main__':{}
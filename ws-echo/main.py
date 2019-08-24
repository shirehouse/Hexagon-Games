import logging
from websocket_server import WebsocketServer

# https://github.com/Pithikos/python-websocket-server
client1 = None
client2 = None

def handleMessage(client, server, msg):
    global client1, client2
    print('Got msg' + msg)
    # echo message back to client
    if client == client1:
        if client2 is not None:
            print('sent to client #2')
            server.send_message(client2, msg)
    if client == client2:
        if client1 is not None:
            print('sent to client #1')
            server.send_message(client1, msg)

def handleConnected(client):
    global client1, client2
    print('connected')
    if client1 is None:
        print('connected client #1')
        client1 = client
    elif client2 is None:
        print('connected client #2')
        client2 = client

def handleClose(client):
    global client1, client2
    print('closed')
    if client1 is client:
        client1 = None
    if client2 is client:
        client2 = None

def new_client(client, server):
    handleConnected(client)
    
def on_msg(client, server, msg):
    handleMessage(client, server, msg)

def on_client_left(client, server):
    handleClose(client)

server = WebsocketServer(8000, host='127.0.0.1', loglevel=logging.INFO)
server.set_fn_new_client(new_client)
server.set_fn_message_received(on_msg)
server.set_fn_client_left(on_client_left)
server.run_forever()
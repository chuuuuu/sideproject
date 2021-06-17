#include <cpprest/ws_client.h>
#include <iostream>
#include "stdafx.h"
using namespace web;
using namespace web::websockets::client;

int main()
{
  websocket_client client;

  client.connect(U("wss://echo.websocket.org")).wait();
  std::cout << "connected successfully!" << std::endl;

  websocket_outgoing_message out_msg;
  out_msg.set_utf8_message("hello");
  client.send(out_msg).wait();
  std::cout << "sent successfully!" << std::endl;

  client.receive()
    .then([](websocket_incoming_message msg) {
      return msg.extract_string();
    })
    .then([](std::string body) {
      std::cout << body << std::endl;
    })
    .wait();
  std::cout << "recieved successfully!" << std::endl;

  client.close().wait();
  std::cout << "closed successfully!" << std::endl;
}

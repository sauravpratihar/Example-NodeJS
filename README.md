END POINTS:
# /public
##### eg: localhost:8000/public/login_url
Public Route, anyone can access
# /protected
##### eg: localhost:8000/protected/get_users
Protected Route, need access-token in header

# User:
| END POINT | HTTP METHOD | REQ PARAMS | Protected |
| ------ | ------ | ------ | ------ | 
| /add_user | POST | first_name, last_name, email, password | Yes |
| /update_user | POST | user_id, (updated data) | Yes |
| /delete_user | POST | user_id | Yes |
| /get_users | GET |  | Yes |
| /login_user | POST | email, password | No |

# Thumbnail:
| END POINT | HTTP METHOD | REQ PARAMS | Protected |
| ------ | ------ | ------ | ------ | 
| /thumbnail | GET | url | Yes | No |

#### localhost:8000/public/login_user endpoint return jwt token
#### protected routes need access-token in header to access protected content

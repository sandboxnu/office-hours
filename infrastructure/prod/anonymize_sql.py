import os

os.system('pg_dump prod > prod.sql')

prod = open('prod.sql', 'r')
anonomized_prod = open('anonomized_prod.sql', 'w')

anonymizing_user = False
anonymizing_phone_numbers = False

lines = prod.readlines()

for line in lines:
  newLine = line


## Anonomize phone numbers
if "\.\n" == line:
  anonymizing_phone_numbers = False
  
if "COPY public.phone_notif_model" in line:
  anonymizing_phone_numbers = True


## Anonomize user data
if "\.\n" == line:
  anonymizing_user = False

if anonymizing_user:
  elements = line.split()
  id = elements[0] # user id
  elements[1] = id + '@northeastern.edu' #email
  elements[2] = '' # photoURL
  elements[5] = 'user' + id # first name
  elements[6] = 'person' + id # last name

  newLine = " ".join(elements) + '\n'

if "COPY public.user_model" in line:
  anonymizing_user = True

if not anonymizing_phone_numbers:
  anonomized_prod.write(newLine)

prod.close()
anonomized_prod.close()

os.remove('prod.sql')

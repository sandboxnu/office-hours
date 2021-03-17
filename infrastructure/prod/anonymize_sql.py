import os

os.system('pg_dump prod > prod.sql')

prod = open('prod.sql', 'r')
anonomized_prod = open('anonomized_prod.sql', 'w')

anonymizing = False

lines = prod.readlines()

for line in lines:
  newLine = line

  if "\.\n" == line:
    anonymizing = False
  
  elements = line.split()
  id = elements[0] # user id
  elements[1] = id + '@northeastern.edu' #email
  elements[2] = '' # photoURL
  elements[5] = 'user' + id # first name
  elements[6] = 'person' + id # last name

    newLine = " ".join(elements) + '\n'

  if "COPY public.user_model" in line:
    anonymizing = True

  anonomized_prod.write(newLine)

prod.close()
anonomized_prod.close()

os.remove('prod.sql')

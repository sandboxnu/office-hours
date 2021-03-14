prod = open('prod.sql', 'r') 
anonomized_prod = open('anonomized_prod.sql', 'w')

lines = prod.readlines()

anonymizing = False

for line in lines:
  newLine = line

  if "\.\n" == line:
    anonymizing = False
  
  if anonymizing:
    elements = line.split()
    id = elements[0]
    elements[1] = id + '@northeastern.edu'
    elements[2] = ''
    elements[5] = 'user' + id
    elements[6] = 'person' + id

    newLine = " ".join(elements) + '\n'

  if "COPY public.user_model" in line:
    anonymizing = True

  anonomized_prod.write(newLine)

prod.close()
anonomized_prod.close()

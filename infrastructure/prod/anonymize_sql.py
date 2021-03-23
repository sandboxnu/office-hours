import os

# Create a SQL dump with prod data
os.system('pg_dump prod > prod.sql')

# Read the data and write a new file with anonymized user data and phone numbers
prod = open('prod.sql')
anonymized_prod = open('anonymized_prod.sql', 'w')

anonymizing_user = False
anonymizing_phone_numbers = False

lines = prod.readlines()

for line in lines:
    newLine = line

    # Anonymize phone numbers
    if "\.\n" == line:
        anonymizing_phone_numbers = False

    if "COPY public.phone_notif_model" in line:
        anonymizing_phone_numbers = True

    # Anonymize user data
    if "\.\n" == line:
        anonymizing_user = False

    if anonymizing_user:
        elements = line.split()
        id = elements[0]  # user id
        elements[1] = id + '@northeastern.edu'  # email            
        elements[-2] = 'user' + id  # first name
        elements[-1] = 'person' + id  # last name
        if len(elements) == 7:
            elements[2] = ''  # photoURL
        elif len(elements) < 6:
            raise ValueError('The number of elements was less than 6')

        newLine = " ".join(elements) + '\n'

    if "COPY public.user_model" in line:
        anonymizing_user = True

    if not anonymizing_phone_numbers:
        anonymized_prod.write(newLine)

prod.close()
anonymized_prod.close()

# Remove the original file with
os.remove('prod.sql')

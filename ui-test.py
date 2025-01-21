def replace_string_in_file(file_path, old_string, new_string):
    # Open the file and read its contents
    with open(file_path, 'r') as file:
        file_content = file.read()

    # Check if the old_string is in the content and if the new_string is not already present
    
    updated_content = file_content.replace(old_string, new_string)

        # Write the updated content back to the file
    with open(file_path, 'w') as file:
        file.write(updated_content)

    print(f"String '{old_string}' replaced with '{new_string}' in {file_path}.")



replace_string_in_file("./homeComponents.tsx", 
                       '//session.storeSecureData(CommonConfig.SESSION_TOKEN, ACCESSTOKEN);',
                       'session.storeSecureData(CommonConfig.SESSION_TOKEN, ACCESSTOKEN);')

replace_string_in_file("./homeComponents.tsx", 
                       "//navigate('/dashboard');", 
                       "navigate('/dashboard');")

replace_string_in_file("./homeComponents.tsx", 
                       "loginFunc();", 
                       "//loginFunc();")

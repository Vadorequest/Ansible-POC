Try to run: `node test.js` from the directory.

You should get something like this:

```
/usr/bin/node test.js
Try running simple Ansible command:
Trying to execute command under Windows:  undefined /c ansible-playbook test.yml
------------- Windows "ansible-playbook" command failed, trying Unix... ---------------
undefined
Trying to execute command under Unix:  ansible-playbook test.yml
ansible-playbook has been automatically executed. (Unix)
Try running correct Ansible command:
Trying to execute command under Windows:  undefined /c ansible-playbook -v -M ../library -i inventory -e '@credentials.yml' test.yml
undefined
Trying to execute command under Unix:  ansible-playbook -v -M ../library -i inventory -e '@credentials.yml' test.yml
------------- Windows "ansible-playbook" command failed, trying Unix... ---------------
ansible-playbook has been automatically executed. (Unix)
ERROR: Unable to find an inventory file, specify one with -i ?

ERROR: nxos_command is not a legal parameter in an Ansible task or handler
```

Excepted that instead of: 

```
ERROR: Unable to find an inventory file, specify one with -i ?

ERROR: nxos_command is not a legal parameter in an Ansible task or handler
```

It should succeed on your computer since you've got both the inventory and the credentials.
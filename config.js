module.exports = {
    env: 'dev',// dev || prod || rct
    default_ansible_filename: 'test',
    prod: {
        ansible_path: '/local/mnt/ansible_roles/ansible-nxos/test/'
    },
    dev: {
        ansible_path: './.tmp_ansible_nxos/test/'
    },
    rct: {
        ansible_path: '/local/mnt/ansible_roles/ansible-nxos/test/'// TODO group_vars/test.yml + host_vars folders
    },
    group_vars_dirname: 'group_vars',
    host_vars_dirname: 'host_vars'
};
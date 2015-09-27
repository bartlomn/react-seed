# -*- mode: ruby -*-
# vi: set ft=ruby :

# Are we running correct version?
Vagrant.require_version '>= 1.7.4'

# Automatically install required Vagrant plugins
required_plugins = %w(vagrant-bindfs vagrant-cachier vagrant-librarian-chef vagrant-omnibus vagrant-share vagrant-vbguest vagrant-triggers)

plugins_to_install = required_plugins.select { |plugin| not Vagrant.has_plugin? plugin }
if not plugins_to_install.empty?
  puts "Installing plugins: #{plugins_to_install.join(' ')}"
  if system "vagrant plugin install #{plugins_to_install.join(' ')}"
    exec "vagrant #{ARGV.join(' ')}"
  else
    abort "Installation of one or more plugins has failed. Aborting."
  end
end

# Vagrant config
Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 9090, host: 9090
  config.vm.network :private_network, type: 'dhcp'

  config.vm.synced_folder ".", "/project_data"

  config.vm.provider "virtualbox" do |vb|
      vb.gui = false
      vb.memory = "1024"
  end

  # Disable berkshelf plugin if present
  if Vagrant.has_plugin?('vagrant-berkshelf')
    config.berkshelf.enabled = false
  end

  config.cache.auto_detect = true
  config.omnibus.chef_version = '12.4.2'
  config.omnibus.cache_packages = true
  config.librarian_chef.cheffile_dir = 'resources/chef'

  config.vm.provision :chef_solo do |chef|
      chef.cookbooks_path = ['resources/chef/cookbooks']
      chef.json = {
        'frontend-standard-stack' => {
            'node' => {
                'version' => '4.1.1'
            },
            'project' => {
                'dir' => '/project_data',
                'log_dir' => '/project_data/logs',
                'postinstall_cmd' => 'npm run dev'
            }
        }
      }
      chef.add_recipe 'frontend-standard-stack::default'
      chef.add_recipe 'frontend-standard-stack::npm-install'
      chef.add_recipe 'frontend-standard-stack::run-postinstall'
  end

  # clean up after destroying vm
  config.trigger.after :destroy do
      run "rm -Rf tmp/*"
  end

  # launch browser after successful startup
  config.trigger.after [:up, :reload, :provision] do
    info "Opening host browser at 'http://localhost:9090'"
    sleep 3
    run "open 'http://localhost:9090'"
  end

end


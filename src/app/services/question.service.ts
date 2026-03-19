import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions: Question[] = [
{
    id: 1,
    type: 'single-choice',
    text: 'Which type of file system is created by mkfs when it is executed with the block device name only and without any additional parameters?',
    explanation: 'Without additional parameters, mkfs creates an ext2 filesystem.',
    answers: [
      { id: 11, text: 'XFS', isCorrect: false },
      { id: 12, text: 'VFAT', isCorrect: false },
      { id: 13, text: 'ext2', isCorrect: true },
      { id: 14, text: 'ext3', isCorrect: false },
      { id: 15, text: 'ext4', isCorrect: false }
    ]
  },
  {
    id: 2,
    type: 'single-choice',
    text: 'Which umask value ensures that new directories can be read, written and listed by their owning user, read and listed by their owning group and are not accessible at all for everyone else?',
    explanation: 'The umask 0027 results in permissions that allow full access for the owner, read and execute for the group, and no permissions for others.',
    answers: [
      { id: 21, text: '0750', isCorrect: false },
      { id: 22, text: '0027', isCorrect: true },
      { id: 23, text: '0036', isCorrect: false },
      { id: 24, text: '7640', isCorrect: false },
      { id: 25, text: '0029', isCorrect: false }
    ]
  },
  {
    id: 3,
    type: 'single-choice',
    text: 'Which of the following commands changes the number of days before the ext3 filesystem on /dev/sda1 has to run through a full filesystem check while booting?',
    explanation: 'The option -i sets the interval between filesystem checks in time units such as days.',
    answers: [
      { id: 31, text: 'tune2fs -d 200 /dev/sda1', isCorrect: false },
      { id: 32, text: 'tune2fs -i 200 /dev/sda1', isCorrect: true },
      { id: 33, text: 'tune2fs -c 200 /dev/sda1', isCorrect: false },
      { id: 34, text: 'tune2fs -n 200 /dev/sda1', isCorrect: false },
      { id: 35, text: 'tune2fs --days 200 /dev/sda1', isCorrect: false }
    ]
  },
  {
    id: 4,
    type: 'single-choice',
    text: 'Which is the default percentage of reserved space for the root user on new ext4 filesystems?',
    explanation: 'By default, ext4 reserves 5% of the filesystem space for the root user.',
    answers: [
      { id: 41, text: '10%', isCorrect: false },
      { id: 42, text: '3%', isCorrect: false },
      { id: 43, text: '15%', isCorrect: false },
      { id: 44, text: '0%', isCorrect: false },
      { id: 45, text: '5%', isCorrect: true }
    ]
  },
  {
    id: 5,
    type: 'single-choice',
    text: 'Which of the following is true when a file system, which is neither listed in /etc/fstab nor known to systemd, is mounted manually?',
    explanation: 'systemd automatically generates a mount unit for a manually mounted filesystem and monitors the mount point.',
    answers: [
      { id: 51, text: 'systemd ignores any manual mounts which are not done using the systemctl mount command', isCorrect: false },
      { id: 52, text: 'The command systemctl mountsync can be used to create a mount unit based on the existing mount', isCorrect: false },
      { id: 53, text: 'systemd automatically generates a mount unit and monitors the mount point without changing it', isCorrect: true },
      { id: 54, text: 'Unless a systemd mount unit is created, systemd unmounts the file system after a short period of time', isCorrect: false },
      { id: 55, text: 'systemctl unmount must be used to remove the mount because systemd opens a file descriptor on the mount point', isCorrect: false }
    ]
  },
  {
    id: 6,
    type: 'fill-in',
    text: 'Which program updates the database that is used by the locate command?',
    explanation: 'The locate database is updated by the updatedb command.',
    answers: [
      { id: 61, text: 'updatedb', isCorrect: true }
    ]
  },
  {
    id: 7,
    type: 'single-choice',
    text: 'What does the command mount --bind do?',
    explanation: 'A bind mount makes the contents of one directory available at another directory path.',
    answers: [
      { id: 71, text: 'It makes the contents of one directory available in another directory', isCorrect: true },
      { id: 72, text: 'It mounts all available filesystems to the current directory', isCorrect: false },
      { id: 73, text: 'It mounts all user mountable filesystems to the user’s home directory', isCorrect: false },
      { id: 74, text: 'It mounts all file systems listed in /etc/fstab which have the option userbindset', isCorrect: false },
      { id: 75, text: 'It permanently mounts a regular file to a directory', isCorrect: false }
    ]
  },
  {
    id: 8,
    type: 'single-choice',
    text: 'Consider the following output from the command ls -i: 525385 a.txt. How would a new file named c.txt be created with the same inode number as a.txt?',
    explanation: 'Creating a hard link with ln a.txt c.txt makes c.txt point to the same inode as a.txt.',
    answers: [
      { id: 81, text: 'ln -h a.txt c.txt', isCorrect: false },
      { id: 82, text: 'ln c.txt a.txt', isCorrect: false },
      { id: 83, text: 'ln a.txt c.txt', isCorrect: true },
      { id: 84, text: 'ln -f c.txt a.txt', isCorrect: false },
      { id: 85, text: 'ln -i 525385 c.txt', isCorrect: false }
    ]
  },
  {
    id: 9,
    type: 'multiple-choice',
    text: 'Consider the following directory: drwxrwxr-x 2 root sales 4096 Jan 1 15:21 sales. Which command ensures new files created within the directory sales are owned by the group sales?',
    explanation: 'Setting the setgid bit on the directory ensures new files inherit the directory group. Both chmod g+s sales and chmod 2775 sales achieve this.',
    answers: [
      { id: 91, text: 'chmod g+s sales', isCorrect: true },
      { id: 92, text: 'setpol -R newgroup=sales sales', isCorrect: false },
      { id: 93, text: 'chgrp -p sales sales', isCorrect: false },
      { id: 94, text: 'chown --persistent *.sales sales', isCorrect: false },
      { id: 95, text: 'chmod 2775 sales', isCorrect: true }
    ]
  },
  {
    id: 10,
    type: 'multiple-choice',
    text: 'In order to display all currently mounted filesystems, which of the following commands could be used?',
    explanation: 'Both mount and cat /proc/self/mounts display currently mounted filesystems.',
    answers: [
      { id: 101, text: 'cat /proc/self/mounts', isCorrect: true },
      { id: 102, text: 'free', isCorrect: false },
      { id: 103, text: 'lsmounts', isCorrect: false },
      { id: 104, text: 'mount', isCorrect: true },
      { id: 105, text: 'cat /proc/filesystems', isCorrect: false }
    ]
  },
  {
    id: 11,
    type: 'fill-in',
    text: 'Which command displays the current disk space usage for all mounted file systems?',
    explanation: 'The df command displays disk space usage for mounted filesystems.',
    answers: [
      { id: 111, text: 'df', isCorrect: true }
    ]
  },
  {
    id: 12,
    type: 'single-choice',
    text: 'Which chown command changes the ownership to dave and the group to staff on a file named data.txt?',
    explanation: 'The syntax user:group is used with chown to set both owner and group.',
    answers: [
      { id: 121, text: 'chown dave/staff data.txt', isCorrect: false },
      { id: 122, text: 'chown -u dave -g staff data.txt', isCorrect: false },
      { id: 123, text: 'chown --user dave --group staff data.txt', isCorrect: false },
      { id: 124, text: 'chown dave+staff data.txt', isCorrect: false },
      { id: 125, text: 'chown dave:staff data.txt', isCorrect: true }
    ]
  },
  {
    id: 13,
    type: 'single-choice',
    text: 'When considering the use of hard links, what are valid reasons not to use hard links?',
    explanation: 'Hard links cannot cross filesystem boundaries, so they cannot point to files on another filesystem.',
    answers: [
      { id: 131, text: 'Hard links are not available on all Linux systems because traditional filesystems, such as ext4, do not support them', isCorrect: false },
      { id: 132, text: 'Each hard link has individual ownership, permissions and ACLs which can lead to unintended disclosure of file content', isCorrect: false },
      { id: 133, text: 'Hard links are specific to one filesystem and cannot point to files on another filesystem', isCorrect: true },
      { id: 134, text: 'If users other than root should be able to create hard links, suln has to be installed and configured', isCorrect: false },
      { id: 135, text: 'When a hard linked file is changed, a copy of the file is created and consumes additional space', isCorrect: false }
    ]
  },
  {
    id: 14,
    type: 'single-choice',
    text: 'In compliance with the FHS, in which of the directories are man pages found?',
    explanation: 'According to the FHS, manual pages are stored in /usr/share/man/.',
    answers: [
      { id: 141, text: '/opt/man/', isCorrect: false },
      { id: 142, text: '/usr/doc/', isCorrect: false },
      { id: 143, text: '/usr/share/man/', isCorrect: true },
      { id: 144, text: '/var/pkg/man', isCorrect: false },
      { id: 145, text: '/var/man/', isCorrect: false }
    ]
  },
  {
    id: 15,
    type: 'fill-in',
    text: 'Which file in the /proc filesystem lists parameters passed from the bootloader to the kernel?',
    explanation: 'The file cmdline in /proc contains the kernel command line parameters.',
    answers: [
      { id: 151, text: 'cmdline', isCorrect: true }
    ]
  },
  {
    id: 16,
    type: 'single-choice',
    text: 'What is the process ID number of the init process on a System V init based system?',
    explanation: 'The init process always runs with process ID 1.',
    answers: [
      { id: 161, text: '-1', isCorrect: false },
      { id: 162, text: '0', isCorrect: false },
      { id: 163, text: '1', isCorrect: true },
      { id: 164, text: 'It is different with each reboot', isCorrect: false },
      { id: 165, text: 'It is set to the current run level', isCorrect: false }
    ]
  },
  {
    id: 17,
    type: 'single-choice',
    text: 'Which daemon handles power management events on a Linux system?',
    explanation: 'acpid handles ACPI power management events on Linux systems.',
    answers: [
      { id: 171, text: 'acpid', isCorrect: true },
      { id: 172, text: 'batteryd', isCorrect: false },
      { id: 173, text: 'pwrmgntd', isCorrect: false },
      { id: 174, text: 'psd', isCorrect: false },
      { id: 175, text: 'inetd', isCorrect: false }
    ]
  },
  {
    id: 18,
    type: 'multiple-choice',
    text: 'Which of the following statements are true about the boot sequence of a PC using a BIOS?',
    explanation: 'The BIOS starts the boot process when the computer is powered on, and some parts of that process can be configured in the BIOS setup.',
    answers: [
      { id: 181, text: 'Some parts of the boot process can be configured from the BIOS', isCorrect: true },
      { id: 182, text: 'Linux does not require the assistance of the BIOS to boot a computer', isCorrect: false },
      { id: 183, text: 'The BIOS boot process starts only if secondary storage, such as the hard disk, is functional', isCorrect: false },
      { id: 184, text: 'The BIOS initiates the boot process after turning the computer on', isCorrect: true },
      { id: 185, text: 'The BIOS is started by loading hardware drivers from secondary storage, such as the hard disk', isCorrect: false }
    ]
  },
  {
    id: 19,
    type: 'multiple-choice',
    text: 'What is true regarding UEFI firmware?',
    explanation: 'UEFI can read partition tables and can read certain filesystems in order to load boot files.',
    answers: [
      { id: 191, text: 'It can read and interpret partition tables', isCorrect: true },
      { id: 192, text: 'It can use and read certain file systems', isCorrect: true },
      { id: 193, text: 'It stores its entire configuration on the /boot/ partition', isCorrect: false },
      { id: 194, text: 'It is stored in a special area within the GPT metadata', isCorrect: false },
      { id: 195, text: 'It is loaded from a fixed boot disk position', isCorrect: false }
    ]
  },
  {
    id: 20,
    type: 'single-choice',
    text: 'A faulty kernel module is causing issues with a network interface card. Which of the following actions ensures that this module is not loaded automatically when the system boots?',
    explanation: 'Adding the module name to a blacklist file in /etc/modprobe.d prevents it from being loaded automatically.',
    answers: [
      { id: 201, text: 'Using lsmod --remove --autoclean without specifying the name of a specific module', isCorrect: false },
      { id: 202, text: 'Using modinfo -k followed by the name of the offending module', isCorrect: false },
      { id: 203, text: 'Using modprobe -r followed by the name of the offending module', isCorrect: false },
      { id: 204, text: 'Adding a blacklist line including the name of the offending module to the file /etc/modprobe.d/blacklist.conf', isCorrect: true },
      { id: 205, text: 'Deleting the kernel module’s directory from the file system and recompiling the kernel, including its modules', isCorrect: false }
    ]
  },
  {
    id: 21,
    type: 'multiple-choice',
    text: 'When is the content of the kernel ring buffer reset?',
    explanation: 'The kernel ring buffer can be cleared explicitly with dmesg --clear, and it is also reset when the system is rebooted or shut down.',
    answers: [
      { id: 211, text: 'When the ring buffer is explicitly reset using the command dmesg --clear', isCorrect: true },
      { id: 212, text: 'When the ring buffer is read using dmesg without any additional parameters', isCorrect: false },
      { id: 213, text: 'When a configurable amount of time, 15 minutes by default, has passed', isCorrect: false },
      { id: 214, text: 'When the kernel loads a previously unloaded kernel module', isCorrect: false },
      { id: 215, text: 'When the system is shut down or rebooted', isCorrect: true }
    ]
  },
  {
    id: 22,
    type: 'single-choice',
    text: 'What is the first program the Linux kernel starts at boot time when using System V init?',
    explanation: 'On a System V init system, the kernel starts /sbin/init first.',
    answers: [
      { id: 221, text: '/lib/init.so', isCorrect: false },
      { id: 222, text: '/proc/sys/kernel/init', isCorrect: false },
      { id: 223, text: '/etc/rc.d/rcinit', isCorrect: false },
      { id: 224, text: '/sbin/init', isCorrect: true },
      { id: 225, text: '/boot/init', isCorrect: false }
    ]
  },
  {
    id: 23,
    type: 'single-choice',
    text: 'A Debian package creates several files during its installation. Which of the following commands searches for packages owning the file /etc/debian_version?',
    explanation: 'dpkg -S searches for the package that owns a given file.',
    answers: [
      { id: 231, text: 'apt-get search /etc/debian_version', isCorrect: false },
      { id: 232, text: 'apt -r /etc/debian_version', isCorrect: false },
      { id: 233, text: 'find /etc/debian_version -dpkg', isCorrect: false },
      { id: 234, text: 'dpkg -S /etc/debian_version', isCorrect: true },
      { id: 235, text: 'apt-file /etc/debian_version', isCorrect: false }
    ]
  },
  {
    id: 24,
    type: 'single-choice',
    text: 'What is contained on the EFI System Partition?',
    explanation: 'The EFI System Partition contains EFI bootloader files, including the first-stage boot files used by UEFI systems.',
    answers: [
      { id: 241, text: 'The Linux root file system', isCorrect: false },
      { id: 242, text: 'The first stage boot loader', isCorrect: true },
      { id: 243, text: 'The default swap space file', isCorrect: false },
      { id: 244, text: 'The Linux default shell binaries', isCorrect: false },
      { id: 245, text: 'The user home directories', isCorrect: false }
    ]
  },
  {
    id: 25,
    type: 'multiple-choice',
    text: 'Which of the following directories on a 64 bit Linux system typically contain shared libraries?',
    explanation: 'On 64-bit Linux systems, shared libraries are typically stored in /lib64/ and /usr/lib64/.',
    answers: [
      { id: 251, text: '~/.lib64/', isCorrect: false },
      { id: 252, text: '/usr/lib64/', isCorrect: true },
      { id: 253, text: '/var/lib64/', isCorrect: false },
      { id: 254, text: '/lib64/', isCorrect: true },
      { id: 255, text: '/opt/lib64/', isCorrect: false }
    ]
  },
  {
    id: 26,
    type: 'multiple-choice',
    text: 'Which of the following files exist in a standard GRUB 2 installation?',
    explanation: 'A standard GRUB 2 installation contains grub.cfg and architecture-specific modules such as lvm.mod.',
    answers: [
      { id: 261, text: '/boot/grub/stages/stage0', isCorrect: false },
      { id: 262, text: '/boot/grub/i386-pc/lvm.mod', isCorrect: true },
      { id: 263, text: '/boot/grub/fstab', isCorrect: false },
      { id: 264, text: '/boot/grub/grub.cfg', isCorrect: true },
      { id: 265, text: '/boot/grub/linux/vmlinuz', isCorrect: false }
    ]
  },
  {
    id: 27,
    type: 'single-choice',
    text: 'Which of the following commands installs all packages with a name ending with the string foo?',
    explanation: 'zypper install "*foo" installs all packages whose names end with foo.',
    answers: [
      { id: 271, text: 'zypper get "*foo"', isCorrect: false },
      { id: 272, text: 'zypper update "foo?"', isCorrect: false },
      { id: 273, text: 'zypper force "foo*"', isCorrect: false },
      { id: 274, text: 'zypper install "*foo"', isCorrect: true },
      { id: 275, text: 'zypper add ".*foo"', isCorrect: false }
    ]
  },
  {
    id: 28,
    type: 'multiple-choice',
    text: 'Which of the following properties of a Linux system should be changed when a virtual machine is cloned?',
    explanation: 'A cloned VM should get a new D-Bus machine ID and new SSH host keys to avoid identity conflicts.',
    answers: [
      { id: 281, text: 'The partitioning scheme', isCorrect: false },
      { id: 282, text: 'The file system', isCorrect: false },
      { id: 283, text: 'The D-Bus Machine ID', isCorrect: true },
      { id: 284, text: 'The permissions of /root/', isCorrect: false },
      { id: 285, text: 'The SSH host keys', isCorrect: true }
    ]
  },
  {
    id: 29,
    type: 'single-choice',
    text: 'Which of the following commands installs GRUB 2 into the master boot record on the third hard disk?',
    explanation: 'The third hard disk is /dev/sdc, and grub-install writes GRUB to the selected disk.',
    answers: [
      { id: 291, text: 'grub2 install /dev/sdc', isCorrect: false },
      { id: 292, text: 'grub-mkrescue /dev/sdc', isCorrect: false },
      { id: 293, text: 'grub-mbrinstall /dev/sdc', isCorrect: false },
      { id: 294, text: 'grub-setup /dev/sdc', isCorrect: false },
      { id: 295, text: 'grub-install /dev/sdc', isCorrect: true }
    ]
  },
  {
    id: 30,
    type: 'single-choice',
    text: 'Which of the following partition types is used for Linux swap spaces when partitioning hard disk drives?',
    explanation: 'Partition type 82 is the traditional Linux swap partition type in MBR partitioning.',
    answers: [
      { id: 301, text: '7', isCorrect: false },
      { id: 302, text: '82', isCorrect: true },
      { id: 303, text: '83', isCorrect: false },
      { id: 304, text: '8e', isCorrect: false },
      { id: 305, text: 'fd', isCorrect: false }
    ]
  },
  {
    id: 31,
    type: 'multiple-choice',
    text: 'What is true regarding the configuration of yum?',
    explanation: 'Yum repository configuration can be split across multiple files, and repository definitions can use variables such as $basearch and $releasever.',
    answers: [
      { id: 311, text: 'Changes to the repository configuration become active after running yum confupdate', isCorrect: false },
      { id: 312, text: 'Changes to the yum configuration become active after restarting the yumd service', isCorrect: false },
      { id: 313, text: 'The configuration of package repositories can be divided into multiple files', isCorrect: true },
      { id: 314, text: 'Repository configurations can include variables such as $basearch or $releasever', isCorrect: true },
      { id: 315, text: 'In case /etc/yum.repos.d/ contains files, /etc/yum.config ignored', isCorrect: false }
    ]
  }
  ];

   getQuestions(): Question[] {
    return this.cloneQuestions(this.questions);
  }

  getShuffledQuestions(): Question[] {
    return this.shuffleQuestions(this.getQuestions());
  }

  getRandomQuestions(count: number): Question[] {
    return this.getShuffledQuestions().slice(0, count);
  }

  private cloneQuestions(questions: Question[]): Question[] {
    return questions.map(question => ({
      ...question,
      answers: question.answers.map(answer => ({ ...answer }))
    }));
  }

  private shuffleQuestions(questions: Question[]): Question[] {
    const shuffledQuestions = [...questions];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [shuffledQuestions[i], shuffledQuestions[randomIndex]] = [
        shuffledQuestions[randomIndex],
        shuffledQuestions[i]
      ];
    }

    return shuffledQuestions;
  }
}
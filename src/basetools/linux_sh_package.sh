## sh 打包代码运行环境

例如：sh 解压一个 python npm 环境

1. 关键代码

```
tail -c 84992969 "$prg_dir/${progname}" > archive.tar.gz 2> /dev/null
gunzip archive.tar.gz
```

2. 学习脚本技巧

```
#!/bin/sh

# Uncomment the following line to override the JVM search sequence
# INSTALL4J_JAVA_HOME_OVERRIDE=
# Uncomment the following line to add additional VM parameters
# INSTALL4J_ADD_VM_PARAMS=


INSTALL4J_JAVA_PREFIX=""
GREP_OPTIONS=""

read_db_entry() {
  if [ -n "$INSTALL4J_NO_DB" ]; then
    return 1
  fi
  if [ ! -f "$db_file" ]; then
    return 1
  fi
  if [ ! -x "$java_exc" ]; then
    return 1
  fi
  found=1
  exec 7< $db_file
  while read r_type r_dir r_ver_major r_ver_minor r_ver_micro r_ver_patch r_ver_vendor<&7; do
    if [ "$r_type" = "JRE_VERSION" ]; then
      if [ "$r_dir" = "$test_dir" ]; then
        ver_major=$r_ver_major
        ver_minor=$r_ver_minor
        ver_micro=$r_ver_micro
        ver_patch=$r_ver_patch
      fi
    elif [ "$r_type" = "JRE_INFO" ]; then
      if [ "$r_dir" = "$test_dir" ]; then
        is_openjdk=$r_ver_major
        found=0
        break
      fi
    fi
  done
  exec 7<&-

  return $found
}

create_db_entry() {
  tested_jvm=true
  version_output=`"$bin_dir/java" $1 -version 2>&1`
  is_gcj=`expr "$version_output" : '.*gcj'`
  is_openjdk=`expr "$version_output" : '.*OpenJDK'`
  if [ "$is_gcj" = "0" ]; then
    java_version=`expr "$version_output" : '.*"\(.*\)".*'`
    ver_major=`expr "$java_version" : '\([0-9][0-9]*\)\..*'`
    ver_minor=`expr "$java_version" : '[0-9][0-9]*\.\([0-9][0-9]*\)\..*'`
    ver_micro=`expr "$java_version" : '[0-9][0-9]*\.[0-9][0-9]*\.\([0-9][0-9]*\).*'`
    ver_patch=`expr "$java_version" : '[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*[\._]\([0-9][0-9]*\).*'`
  fi
  if [ "$ver_patch" = "" ]; then
    ver_patch=0
  fi
  if [ -n "$INSTALL4J_NO_DB" ]; then
    return
  fi
  db_new_file=${db_file}_new
  if [ -f "$db_file" ]; then
    awk '$1 != "'"$test_dir"'" {print $0}' $db_file > $db_new_file
    rm "$db_file"
    mv "$db_new_file" "$db_file"
  fi
  dir_escaped=`echo "$test_dir" | sed -e 's/ /\\\\ /g'`
  echo "JRE_VERSION	$dir_escaped	$ver_major	$ver_minor	$ver_micro	$ver_patch" >> $db_file
  echo "JRE_INFO	$dir_escaped	$is_openjdk" >> $db_file
  chmod g+w $db_file
}

test_jvm() {
  tested_jvm=na
  test_dir=$1
  bin_dir=$test_dir/bin
  java_exc=$bin_dir/java
  if [ -z "$test_dir" ] || [ ! -d "$bin_dir" ] || [ ! -f "$java_exc" ] || [ ! -x "$java_exc" ]; then
    return
  fi

  tested_jvm=false
  read_db_entry || create_db_entry $2

  if [ "$ver_major" = "" ]; then
    return;
  fi
  if [ "$ver_major" -lt "1" ]; then
    return;
  elif [ "$ver_major" -eq "1" ]; then
    if [ "$ver_minor" -lt "7" ]; then
      return;
    fi
  fi

  if [ "$ver_major" = "" ]; then
    return;
  fi
  app_java_home=$test_dir
}

add_class_path() {
  if [ -n "$1" ] && [ `expr "$1" : '.*\*'` -eq "0" ]; then
    local_classpath="$local_classpath${local_classpath:+:}$1"
  fi
}

compiz_workaround() {
  if [ "$is_openjdk" != "0" ]; then
    return;
  fi
  if [ "$ver_major" = "" ]; then
    return;
  fi
  if [ "$ver_major" -gt "1" ]; then
    return;
  elif [ "$ver_major" -eq "1" ]; then
    if [ "$ver_minor" -gt "6" ]; then
      return;
    elif [ "$ver_minor" -eq "6" ]; then
      if [ "$ver_micro" -gt "0" ]; then
        return;
      elif [ "$ver_micro" -eq "0" ]; then
        if [ "$ver_patch" -gt "09" ]; then
          return;
        fi
      fi
    fi
  fi


  osname=`uname -s`
  if [ "$osname" = "Linux" ]; then
    compiz=`ps -ef | grep -v grep | grep compiz`
    if [ -n "$compiz" ]; then
      export AWT_TOOLKIT=MToolkit
    fi
  fi

}


read_vmoptions() {
  vmoptions_file=`eval echo "$1" 2>/dev/null`
  if [ ! -r "$vmoptions_file" ]; then
    vmoptions_file="$prg_dir/$vmoptions_file"
  fi
  if [ -r "$vmoptions_file" ] && [ -f "$vmoptions_file" ]; then
    exec 8< "$vmoptions_file"
    while read cur_option<&8; do
      is_comment=`expr "W$cur_option" : 'W *#.*'`
      if [ "$is_comment" = "0" ]; then 
        vmo_classpath=`expr "W$cur_option" : 'W *-classpath \(.*\)'`
        vmo_classpath_a=`expr "W$cur_option" : 'W *-classpath/a \(.*\)'`
        vmo_classpath_p=`expr "W$cur_option" : 'W *-classpath/p \(.*\)'`
        vmo_include=`expr "W$cur_option" : 'W *-include-options \(.*\)'`
        if [ ! "W$vmo_include" = "W" ]; then
            if [ "W$vmo_include_1" = "W" ]; then
              vmo_include_1="$vmo_include"
            elif [ "W$vmo_include_2" = "W" ]; then
              vmo_include_2="$vmo_include"
            elif [ "W$vmo_include_3" = "W" ]; then
              vmo_include_3="$vmo_include"
            fi
        fi
        if [ ! "$vmo_classpath" = "" ]; then
          local_classpath="$i4j_classpath:$vmo_classpath"
        elif [ ! "$vmo_classpath_a" = "" ]; then
          local_classpath="${local_classpath}:${vmo_classpath_a}"
        elif [ ! "$vmo_classpath_p" = "" ]; then
          local_classpath="${vmo_classpath_p}:${local_classpath}"
        elif [ "W$vmo_include" = "W" ]; then
          needs_quotes=`expr "W$cur_option" : 'W.* .*'`
          if [ "$needs_quotes" = "0" ]; then 
            vmoptions_val="$vmoptions_val $cur_option"
          else
            if [ "W$vmov_1" = "W" ]; then
              vmov_1="$cur_option"
            elif [ "W$vmov_2" = "W" ]; then
              vmov_2="$cur_option"
            elif [ "W$vmov_3" = "W" ]; then
              vmov_3="$cur_option"
            elif [ "W$vmov_4" = "W" ]; then
              vmov_4="$cur_option"
            elif [ "W$vmov_5" = "W" ]; then
              vmov_5="$cur_option"
            fi
          fi
        fi
      fi
    done
    exec 8<&-
    if [ ! "W$vmo_include_1" = "W" ]; then
      vmo_include="$vmo_include_1"
      unset vmo_include_1
      read_vmoptions "$vmo_include"
    fi
    if [ ! "W$vmo_include_2" = "W" ]; then
      vmo_include="$vmo_include_2"
      unset vmo_include_2
      read_vmoptions "$vmo_include"
    fi
    if [ ! "W$vmo_include_3" = "W" ]; then
      vmo_include="$vmo_include_3"
      unset vmo_include_3
      read_vmoptions "$vmo_include"
    fi
  fi
}


unpack_file() {
  if [ -f "$1" ]; then
    jar_file=`echo "$1" | awk '{ print substr($0,1,length-5) }'`
    bin/unpack200 -r "$1" "$jar_file"

    if [ $? -ne 0 ]; then
      echo "Error unpacking jar files. The architecture or bitness (32/64)"
      echo "of the bundled JVM might not match your machine."
returnCode=1
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
    fi
  fi
}

run_unpack200() {
  if [ -f "$1/lib/rt.jar.pack" ]; then
    old_pwd200=`pwd`
    cd "$1"
    echo "Preparing JRE ..."
    for pack_file in lib/*.jar.pack
    do
      unpack_file $pack_file
    done
    for pack_file in lib/ext/*.jar.pack
    do
      unpack_file $pack_file
    done
    cd "$old_pwd200"
  fi
}

search_jre() {
if [ -z "$app_java_home" ]; then
  test_jvm $INSTALL4J_JAVA_HOME_OVERRIDE
fi

if [ -z "$app_java_home" ]; then
if [ -f "$app_home/.install4j/pref_jre.cfg" ]; then
    read file_jvm_home < "$app_home/.install4j/pref_jre.cfg"
    test_jvm "$file_jvm_home"
    if [ -z "$app_java_home" ] && [ $tested_jvm = "false" ]; then
if [ -f "$db_file" ]; then
  rm "$db_file" 2> /dev/null
fi
        test_jvm "$file_jvm_home"
    fi
fi
fi

if [ -z "$app_java_home" ]; then
  test_jvm "$app_home/jdk" 
  if [ -z "$app_java_home" ] && [ $tested_jvm = "false" ]; then
if [ -f "$db_file" ]; then
  rm "$db_file" 2> /dev/null
fi
    test_jvm "$app_home/jdk"
  fi
fi

if [ -z "$app_java_home" ]; then
  test_jvm $INSTALL4J_JAVA_HOME
fi

if [ -z "$app_java_home" ]; then
if [ -f "$app_home/.install4j/inst_jre.cfg" ]; then
    read file_jvm_home < "$app_home/.install4j/inst_jre.cfg"
    test_jvm "$file_jvm_home"
    if [ -z "$app_java_home" ] && [ $tested_jvm = "false" ]; then
if [ -f "$db_file" ]; then
  rm "$db_file" 2> /dev/null
fi
        test_jvm "$file_jvm_home"
    fi
fi
fi

}

TAR_OPTIONS="--no-same-owner"
export TAR_OPTIONS

old_pwd=`pwd`

progname=`basename "$0"`
linkdir=`dirname "$0"`

cd "$linkdir"
prg="$progname"

while [ -h "$prg" ] ; do
  ls=`ls -ld "$prg"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '.*/.*' > /dev/null; then
    prg="$link"
  else
    prg="`dirname $prg`/$link"
  fi
done

prg_dir=`dirname "$prg"`
progname=`basename "$prg"`
cd "$prg_dir"
prg_dir=`pwd`
app_home=.
cd "$app_home"
app_home=`pwd`
bundled_jre_home="$app_home/jre"

if [ "__i4j_lang_restart" = "$1" ]; then
  cd "$old_pwd"
else
cd "$prg_dir"/.


which gunzip > /dev/null 2>&1
if [ "$?" -ne "0" ]; then
  echo "Sorry, but I could not find gunzip in path. Aborting."
  exit 1
fi

  if [ -d "$INSTALL4J_TEMP" ]; then
     sfx_dir_name="$INSTALL4J_TEMP/${progname}.$$.dir"
  elif [ "__i4j_extract_and_exit" = "$1" ]; then
     sfx_dir_name="${progname}.test"
  else
     sfx_dir_name="${progname}.$$.dir"
  fi
mkdir "$sfx_dir_name" > /dev/null 2>&1
if [ ! -d "$sfx_dir_name" ]; then
  sfx_dir_name="/tmp/${progname}.$$.dir"
  mkdir "$sfx_dir_name"
  if [ ! -d "$sfx_dir_name" ]; then
    echo "Could not create dir $sfx_dir_name. Aborting."
    exit 1
  fi
fi
cd "$sfx_dir_name"
if [ "$?" -ne "0" ]; then
    echo "The temporary directory could not created due to a malfunction of the cd command. Is the CDPATH variable set without a dot?"
    exit 1
fi
sfx_dir_name=`pwd`
if [ "W$old_pwd" = "W$sfx_dir_name" ]; then
    echo "The temporary directory could not created due to a malfunction of basic shell commands."
    exit 1
fi
trap 'cd "$old_pwd"; rm -R -f "$sfx_dir_name"; exit 1' HUP INT QUIT TERM
tail -c 84992969 "$prg_dir/${progname}" > sfx_archive.tar.gz 2> /dev/null
if [ "$?" -ne "0" ]; then
  tail -84992969c "$prg_dir/${progname}" > sfx_archive.tar.gz 2> /dev/null
  if [ "$?" -ne "0" ]; then
    echo "tail didn't work. This could be caused by exhausted disk space. Aborting."
returnCode=1
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
  fi
fi
gunzip sfx_archive.tar.gz
if [ "$?" -ne "0" ]; then
  echo ""
  echo "I am sorry, but the installer file seems to be corrupted."
  echo "If you downloaded that file please try it again. If you"
  echo "transfer that file with ftp please make sure that you are"
  echo "using binary mode."
returnCode=1
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
fi
tar xf sfx_archive.tar  > /dev/null 2>&1
if [ "$?" -ne "0" ]; then
  echo "Could not untar archive. Aborting."
returnCode=1
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
fi

fi
if [ "__i4j_extract_and_exit" = "$1" ]; then
  cd "$old_pwd"
  exit 0
fi
db_home=$HOME
db_file_suffix=
if [ ! -w "$db_home" ]; then
  db_home=/tmp
  db_file_suffix=_$USER
fi
db_file=$db_home/.install4j$db_file_suffix
if [ -d "$db_file" ] || ([ -f "$db_file" ] && [ ! -r "$db_file" ]) || ([ -f "$db_file" ] && [ ! -w "$db_file" ]); then
  db_file=$db_home/.install4j_jre$db_file_suffix
fi
if [ -f "$db_file" ]; then
  rm "$db_file" 2> /dev/null
fi
if [ ! "__i4j_lang_restart" = "$1" ]; then

if [ -f "$prg_dir/jre.tar.gz" ] && [ ! -f jre.tar.gz ] ; then
  cp "$prg_dir/jre.tar.gz" .
fi


if [ -f jre.tar.gz ]; then
  echo "Unpacking JRE ..."
  gunzip jre.tar.gz
  mkdir jre
  cd jre
  tar xf ../jre.tar
  app_java_home=`pwd`
  bundled_jre_home="$app_java_home"
  cd ..
fi

run_unpack200 "$bundled_jre_home"
run_unpack200 "$bundled_jre_home/jre"
else
  if [ -d jre ]; then
    app_java_home=`pwd`
    app_java_home=$app_java_home/jre
  fi
fi
search_jre
if [ -z "$app_java_home" ]; then
  echo No suitable Java Virtual Machine could be found on your system.
  echo The version of the JVM must be at least 1.7.
  echo Please define INSTALL4J_JAVA_HOME to point to a suitable JVM.
returnCode=83
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
fi


compiz_workaround

packed_files="*.jar.pack user/*.jar.pack user/*.zip.pack"
for packed_file in $packed_files
do
  unpacked_file=`expr "$packed_file" : '\(.*\)\.pack$'`
  $app_java_home/bin/unpack200 -q -r "$packed_file" "$unpacked_file" > /dev/null 2>&1
done

local_classpath=""
i4j_classpath="i4jruntime.jar:user.jar"
add_class_path "$i4j_classpath"
for i in `ls "user" 2> /dev/null | egrep "\.(jar|zip)$"`
do
  add_class_path "user/$i"
done

vmoptions_val=""
read_vmoptions "$prg_dir/$progname.vmoptions"
INSTALL4J_ADD_VM_PARAMS="$INSTALL4J_ADD_VM_PARAMS $vmoptions_val"

INSTALL4J_ADD_VM_PARAMS="$INSTALL4J_ADD_VM_PARAMS -Di4j.vpt=true"
for param in $@; do
  if [ `echo "W$param" | cut -c -3` = "W-J" ]; then
    INSTALL4J_ADD_VM_PARAMS="$INSTALL4J_ADD_VM_PARAMS `echo "$param" | cut -c 3-`"
  fi
done

if [ "W$vmov_1" = "W" ]; then
  vmov_1="-Di4jv=0"
fi
if [ "W$vmov_2" = "W" ]; then
  vmov_2="-Di4jv=0"
fi
if [ "W$vmov_3" = "W" ]; then
  vmov_3="-Di4jv=0"
fi
if [ "W$vmov_4" = "W" ]; then
  vmov_4="-Di4jv=0"
fi
if [ "W$vmov_5" = "W" ]; then
  vmov_5="-Di4jv=0"
fi
echo "Starting Installer ..."

$INSTALL4J_JAVA_PREFIX "$app_java_home/bin/java" -Dinstall4j.jvmDir="$app_java_home" -Dexe4j.moduleName="$prg_dir/$progname" -Dexe4j.totalDataLength=724359192 -Dinstall4j.cwd="$old_pwd" -Djava.ext.dirs="$app_java_home/lib/ext:$app_java_home/jre/lib/ext" "-Dsun.java2d.noddraw=true" "-Dinstall4j.defaultLanguage=zh_CN" "$vmov_1" "$vmov_2" "$vmov_3" "$vmov_4" "$vmov_5" $INSTALL4J_ADD_VM_PARAMS -classpath "$local_classpath" com.install4j.runtime.launcher.UnixLauncher launch 0 "" "" com.install4j.runtime.installer.Installer  "$@"


returnCode=$?
cd "$old_pwd"
  if [ ! "W $INSTALL4J_KEEP_TEMP" = "W yes" ]; then
     rm -R -f "$sfx_dir_name"
  fi
exit $returnCode
桎?   0.dat      ) 24.dat    &?PK
    "僙R               .install4j\/PK
   "僙R禇?2   6     .install4j/2bfa42ba.lprop  6       2       Sv+蔜pKMR02S04?2?0QpQ0202?43?慒 夷轮€诵?? PK
   !僙R9*繏2   6     .install4j/8603d061.lprop  6       2       Sv+蔜pKMR02S04?2?0VpQ0202?43?慒?\? 依H PK
   "僙Rl]?
  ?    .install4j/finebi.png  ?       
      ?髩PNG


```

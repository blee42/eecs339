# Setup ORACLE environment

export ORACLE_BASE=/raid/oracle11g/app/oracle/product/11.2.0.1.0
export ORACLE_HOME=$ORACLE_BASE/db_1
export ORACLE_SID=CS339

export TNS_ADMIN=$ORACLE_HOME/config
export ORA_NLS33=$ORACLE_HOME/nls/data



export ORACLE_TERM=xterm
export ORACLE_OWNER=oracle


export NLS_LANG=AMERICAN_AMERICA.WE8ISO8859P1
#export CLASSPATH=$ORACLE_HOME/jdbc/lib/classes12.zip
#export LD_LIBRARY_PATH=$ORACLE_HOME/lib

# Set up JAVA 
#export JAVA_HOME=/usr/
#export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib

# Set up the search paths:

export PATH=$PATH:$ORACLE_HOME/bin

export SQLPATH=/raid/pdinda/HANDOUT:.

#PATH=$PATH:/usr/local/jdk/bin



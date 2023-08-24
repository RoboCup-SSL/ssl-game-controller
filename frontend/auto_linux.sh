if [ ! -d dist ]; then
	echo "you need excute 'npm run build' before"
else
	cd dist/

	if [ ! -d utils ]; then
		mkdir utils
		cd ..
		cp utils/translate.js dist/utils
		echo "config success"
	else 
		if [ -f "/dist/utils/translate.js" ]; then
			echo "translate.js exists "
		else
			cp ../utils/translate.js utils
			echo "config success"	
		fi
	fi
fi

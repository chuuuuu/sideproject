if [ -d build ]; then
  rm -r build
fi

mkdir build

for cppfile in $(ls src/); do
  file=${cppfile%.cpp}
  g++-10 src/$cppfile -o build/$file
done

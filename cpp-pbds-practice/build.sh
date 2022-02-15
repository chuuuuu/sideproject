if [ -d build ]; then
  rm -r build
fi

mkdir build

for cppfile in $(ls src/); do
  file=${cppfile%.cpp}
  g++-11 -std=c++20 src/$cppfile -o build/$file
done

#include <iostream>
#include <cstdio>
#include <ctime>

using namespace std;

void print(int *a, int n)
{
    int i=0;
    while(i<n){
        cout<<a[i]<<",";
        i++;
    }
    cout<<endl;
}

void swap(int i,int j, int *a){
    int temp = a[i];
    a[i] = a[j];
    a[j] = temp;
    print(a, 8);
}


void quicksort(int *arr, int left, int right){
    int min = (left+right)/2;
    cout<<"QS:"<<left<<","<<right<<"\n";

    int i = left;
    int j = right;
    int pivot = arr[min];

    while(left<j || i<right)
    {
        while(arr[i]<pivot)
        i++;
        while(arr[j]>pivot)
        j--;

        if(i<=j){
            swap(i,j,arr);
            i++;
            j--;
        }
        else{
            if(left<j)
                quicksort(arr, left, j);
            if(i<right)
                quicksort(arr,i,right);
            return;
        }
    }
}


int main() {
    std::clock_t start;
    double duration;
    start = std::clock();
    
    int arr[8] = {110, 5, 10,3 ,22, 100, 1, 23};
    print(arr, (sizeof(arr)/sizeof(arr[0])));
    quicksort(arr, 0, (sizeof(arr)/sizeof(arr[0]))-1);
    
    duration = (std::clock() - start) * 1000 /(double) CLOCKS_PER_SEC;
    cout<<"time to quicksort="<<duration<< "ms"<<endl; 
    return 0;
}
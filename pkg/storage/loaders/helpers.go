package loaders

import (
	"fmt"

	"github.com/graph-gophers/dataloader/v7"

	"github.com/cms-enterprise/mint-app/pkg/helpers"
)

func transformToDataLoaderResult[V any](val V, valueFound bool) *dataloader.Result[V] {
	if valueFound {
		return &dataloader.Result[V]{Data: val, Error: nil}
	}

	return &dataloader.Result[V]{Data: val, Error: fmt.Errorf("issue getting result for type %T, err: %w", val, ErrRecordNotFoundForKey)}
}

func oneToOneDataLoaderFunc[K comparable, V any](keys []K, values []V, getKey func(V) K) []*dataloader.Result[V] {

	return helpers.OneToOneFunc(keys, values, getKey, transformToDataLoaderResult)
}

func errorPerEachKey[K comparable, V any](keys []K, err error) []*dataloader.Result[V] {
	var empty V
	output := make([]*dataloader.Result[V], len(keys))
	for index := range keys {
		output[index] = &dataloader.Result[V]{Data: empty, Error: err}
	}
	return output
}
